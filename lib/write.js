const fs = require('fs-extra');
const path = require('path');
const ora = require('ora');
const { mapPromisesSeries } = require('./utils');

const write = async function (pequeno, rendered) {
    const spinner = ora();

    await mapPromisesSeries(rendered, async (render) => {
        const dest = path.join(
            pequeno.config.outputDir,
            render.data.route.href,
        );
        spinner.start(`Writing ${dest}`);
        await fs.outputFile(dest, render.markup);
        spinner.succeed();
        spinner.stop();
    });
};

module.exports = write;
