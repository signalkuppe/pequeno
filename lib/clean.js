/**
 * Clean dest folder
 */

const path = require('path');
const fs = require('fs-extra');
const ora = require('ora');

const clean = async function (pequeno) {
    try {
        const spinner = ora();
        const dir = path.join(process.cwd(), pequeno.config.outputDir);
        spinner.start(`Cleaning ${dir}`);
        await fs.emptyDir(dir);
        spinner.succeed();
        spinner.stop();
    } catch (err) {
        pequeno.log.error(`Clean error`, err);
        process.exit();
    }
};

module.exports = clean;
