const fs = require('fs-extra');
const path = require('path');
const { seriesMap } = require('./utils');

const write = async function (pequeno, rendered) {
    await seriesMap(rendered, async (render) => {
        const dest = path.join(
            pequeno.config.outputDir,
            render.data.route.href,
        );
        await fs.outputFile(dest, render.markup);
        pequeno.log.info(`writed %s`, dest);
    });
};

module.exports = write;
