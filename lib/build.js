const path = require('path');
const getPages = require('./getPages');
const clean = require('./clean');
const bundle = require('./bundle');
const render = require('./render');
const write = require('./write');
const copy = require('./copy');
const getData = require('./getData');
const afterBuild = require('./afterBuild');
const { mapPromises } = require('./utils');

const build = async function (options) {
    let renderedPages = [];
    pequeno.log.verbose(`Build start`);
    if (options.clean) {
        await clean();
    }
    await copy();
    const data = await getData();
    let pages = await getPages();
    const time = process.hrtime();
    if (options.page) {
        pages = pages.filter((p) => path.basename(p) === options.page);
    }
    await mapPromises(pages, async (page) => {
        const bundled = await bundle(page);
        const rendered = render(bundled, data, options.path);
        renderedPages = [...renderedPages, ...rendered];
        await mapPromises(rendered, async (renderedPage) => {
            const finalMarkup = await write(renderedPage, options);
            // attach the processed markup
            renderedPages.find(
                (page) => page.data.route.href === renderedPage.data.route.href,
            ).markup = finalMarkup;
        });
    })
        .then(async () => {
            const ended = process.hrtime(time);
            const secondsElapsed = ended[0] + ended[1] / Math.pow(10, 9);
            pequeno.log.info(
                '🚀 Build finished: writed %d files in %d seconds (%d pages per second)',
                renderedPages.length,
                secondsElapsed.toFixed(1),
                parseInt(renderedPages.length / secondsElapsed),
            );
            if (pequeno.config.afterBuild && !options.noAfterBuild) {
                await afterBuild(renderedPages);
            }
        })
        .catch((err) => {
            pequeno.log.error('Build error', err);
            throw new Error(err);
        });
};

module.exports = build;
