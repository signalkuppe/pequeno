/**
 * Clean dest folder
 */

const path = require('path');
const fs = require('fs-extra');

const clean = async function () {
    try {
        pequeno.log.verbose('Cleaning output folder');
        const dir = path.join(process.cwd(), pequeno.config.outputDir);
        await fs.emptyDir(dir);
        pequeno.log.info('Cleaned output folder');
    } catch (err) {
        pequeno.log.error(`Clean error`, err);
        process.exit();
    }
};

module.exports = clean;
