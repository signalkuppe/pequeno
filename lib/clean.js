/**
 * Clean dest folder
 */

const fs = require('fs-extra');
const { joinPath } = require('./utils');

const clean = async function (pequeno) {
    try {
        pequeno.log.verbose('Cleaning output folder');
        const dir = joinPath(process.cwd(), pequeno.config.outputDir);
        await fs.emptyDir(dir);
        pequeno.log.info('Cleaned output folder');
    } catch (err) {
        pequeno.log.error(`Clean error`, err);
        process.exit();
    }
};

module.exports = clean;
