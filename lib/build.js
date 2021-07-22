const getPages = require('./getPages');
const bundle = require('./bundle');
const render = require('./render');
const write = require('./write');
const copy = require('./copy');
const getData = require('./getData');
const { mapPromises } = require('./utils');

const build = async function (pequeno, page) {
    let writed = 0;
    pequeno.log.verbose(`Build start`);
    await copy(pequeno);
    const data = await getData(pequeno);
    const pages = await getPages(pequeno, page);
    const time = process.hrtime();
    await mapPromises(pages, async (page) => {
        const bundled = await bundle(pequeno, page);
        const rendered = render(pequeno, bundled, data);
        await write(pequeno, rendered);
        writed = writed + rendered.length;
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
