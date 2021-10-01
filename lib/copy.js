/**
 * Copy static assets
 */

const path = require('path');
const fs = require('fs-extra');
const ora = require('ora');

const copy = async function (pequeno, file) {
    const dest = path.join(process.cwd(), pequeno.config.outputDir);
    const src = path.join(pequeno.baseDir, pequeno.config.publicDir);
    try {
        if (file) {
            // single file to copy from a change in the public dir
            const relativePath = path.relative(src, file);
            const fullDest = path.join(dest, relativePath);
            const spinner = ora();
            spinner.start(`Cleaning ${dir}`);
            fs.copySync(file, fullDest);
            spinner.succeed();
            spinner.stop();
        } else {
            // libs defined in copy config
            if (pequeno.config.copy) {
                const what = pequeno.config.copy;
                for (let key in what) {
                    if (what.hasOwnProperty(key)) {
                        const spinner = ora();
                        const from = path.join(process.cwd(), key);
                        const to = path.join(dest, what[key]);
                        spinner.start(`Copying ${key} to ${what[key]}`);
                        fs.copySync(from, to);
                        spinner.succeed();
                        spinner.stop();
                    } else {
                    }
                }
            }

            if (fs.pathExistsSync(src)) {
                const spinner = ora();
                spinner.start(
                    `Copying ${pequeno.config.publicDir} to ${pequeno.config.outputDir}`,
                );
                fs.copySync(src, dest);
                spinner.succeed();
                spinner.stop();
            } else {
                pequeno.log.info(
                    `Nothing to copy to %s`,
                    pequeno.config.outputDir,
                );
            }
        }
    } catch (err) {
        pequeno.log.error('Copy error', err);
    }
};

module.exports = copy;
