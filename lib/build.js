const getPages = require('./getPages');
const clean = require('./clean');
const bundle = require('./bundle');
const render = require('./render');
const write = require('./write');
const copy = require('./copy');
const getData = require('./getData');
const { mapPromises } = require('./utils');

const build = async function (options) {
    let writed = 0;
    pequeno.log.verbose(`Build start`);
    if (options.clean) {
        await clean();
    }
    await copy();
    const data = await getData();
    const pages = await getPages();
    const time = process.hrtime();
    await mapPromises(pages, async (page) => {
        const bundled = await bundle(page);
        const rendered = render(bundled, data, options.page);
        await mapPromises(rendered, async (renderedPage) => {
            await write(renderedPage);
            writed = ++writed;
        });
    })
        .then(async () => {
            const ended = process.hrtime(time);
            const secondsElapsed = ended[0] + ended[1] / Math.pow(10, 9);
            pequeno.log.info(
                '🚀 Build finished: writed %d files in %d seconds (%d pages per second)',
                writed,
                secondsElapsed.toFixed(1),
                parseInt(writed / secondsElapsed),
            );
            if (pequeno.config.afterBuild) {
                pequeno.log.verbose(`Running afterBuild function`);
                try {
                    await pequeno.config.afterBuild();
                    pequeno.log.info(`afterBuild completed`);
                } catch (err) {
                    pequeno.log.error(
                        'An error occurred invoking afterBuild function %o',
                        err,
                    );
                }
            }
        })
        .catch((err) => {
            pequeno.log.error('Build error', err);
            throw new Error(err);
        });
};

module.exports = build;
