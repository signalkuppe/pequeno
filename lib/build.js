const path = require('path');
const getPages = require('./getPages');
const clean = require('./clean');
const bundle = require('./bundle');
const render = require('./render');
const write = require('./write');
const copy = require('./copy');
const getData = require('./getData');
const afterBuild = require('./afterBuild');
const { mapPromisesSeries } = require('./utils');

const build = async function () {
    let renderedPages = [];
    let data = {};
    pequeno.log.verbose(`Build start`);
    if (pequeno.options.clean) {
        await clean();
    }
    await copy();
    if (!pequeno.options.noData) {
        data = await getData();
    }
    let pages = await getPages();
    const time = process.hrtime();
    if (pequeno.options.page) {
        pages = pages.filter(
            (p) => path.basename(p, '.jsx') === pequeno.options.page,
        );
    }
    await mapPromisesSeries(pages, async (page) => {
        const bundled = await bundle(page);
        pequeno.log.info(`Rendering ${path.basename(page)}...`);
        const rendered = render(bundled, data);
        renderedPages = [...renderedPages, ...rendered];
        await mapPromisesSeries(rendered, async (renderedPage) => {
            const finalMarkup = await write(renderedPage);
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
                'Build finished: wrote %d files in %d seconds (%d pages per second)',
                renderedPages.length,
                secondsElapsed.toFixed(1),
                parseInt(renderedPages.length / secondsElapsed),
            );
            if (pequeno.config.afterBuild && !pequeno.options.noAfterBuild) {
                await afterBuild(renderedPages);
            }
        })
        .catch((err) => {
            pequeno.log.error('Build error', err);
            throw new Error(err);
        });
};

module.exports = build;
