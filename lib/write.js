const fs = require('fs-extra');
const path = require('path');
const { mapPromises } = require('./utils');

const write = async function (pequeno, rendered) {
    await mapPromises(rendered, async (render) => {
        const dest = path.join(
            pequeno.config.outputDir,
            render.data.route.href,
        );
        pequeno.log.verbose(`Writing %s`, dest);
        await fs.outputFile(dest, render.markup);
        pequeno.log.info(`writed %s`, dest);
    });
};

module.exports = write;
