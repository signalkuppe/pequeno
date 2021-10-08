const path = require('path');
const Piscina = require('piscina');
const { MessageChannel } = require('worker_threads');
const getPages = require('./getPages');
const bundle = require('./bundle');
const render = require('./render');
const write = require('./write');
const copy = require('./copy');
const clean = require('./clean');
const getData = require('./getData');

const piscina = new Piscina({
    filename: path.resolve(__dirname, 'write.js'),
});

const build = async function (options) {
    try {
        pequeno.log.verbose(`Build start`);
        if (options.clean) {
            await clean();
        }
        await copy();
        const data = await getData();
        const pages = await getPages();
        const time = process.hrtime();
        let doneTotal = 0;
        let donePages = 0;
        for (const page of pages) {
            const bundled = await bundle(page);
            const rendered = render(bundled, data);
            let doneRendered = 0;
            for (const renderedPage of rendered) {
                const { markup, styles, data } = renderedPage;
                const { config, log } = pequeno;

                const channel = new MessageChannel();
                channel.port2.on('message', (message) => {
                    const { level, msg } = message;
                    log[level](msg);
                });
                await piscina.run(
                    {
                        markup,
                        styles,
                        data,
                        config,
                        port: channel.port1,
                    },
                    { transferList: [channel.port1] },
                );
                ++doneRendered;
                ++doneTotal;
                if (doneRendered === rendered.length) {
                    ++donePages;
                }
                if (donePages === pages.length) {
                    piscina.destroy();
                    const ended = process.hrtime(time);
                    const secondsElapsed =
                        ended[0] + ended[1] / Math.pow(10, 9);
                    pequeno.log.info(
                        '🚀 Build finished: writed %d files in %d seconds (%d pages per second)',
                        doneTotal,
                        secondsElapsed.toFixed(1),
                        parseInt(doneTotal / secondsElapsed),
                    );
                }
            }
        }
    } catch (err) {
        pequeno.log.error('Build error', err);
        throw new Error(err);
    }

    /*
        .then(async () => {
            console.log('!!!');
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
        }); */
};

module.exports = build;
