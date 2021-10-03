/**
 * Copy static assets
 */

const path = require('path');
const fs = require('fs-extra');

const copy = async function (pequeno, file) {
    const dest = path.join(process.cwd(), pequeno.config.outputDir);
    const src = path.join(pequeno.baseDir, pequeno.config.publicDir);
    try {
        if (file) {
            // single file to copy from a change in the public dir
            const relativePath = path.relative(src, file);
            const fullDest = path.join(dest, relativePath);
            await fs.copy(file, fullDest);
            pequeno.log.info(
                'Copied %s to %s',
                path.parse(file).name,
                relativePath,
            );
        } else {
            // libs defined in copy config
            if (pequeno.config.copy) {
                const what = pequeno.config.copy;
                for (let key in what) {
                    if (what.hasOwnProperty(key)) {
                        const from = path.join(process.cwd(), key);
                        const to = path.join(dest, what[key]);
                        await fs.copy(from, to);
                        pequeno.log.info('Copied %s to %s', key, what[key]);
                    } else {
                    }
                }
            }

            if (fs.pathExistsSync(src)) {
                await fs.copy(src, dest);
                pequeno.log.info(
                    'Copied %s to %s',
                    pequeno.config.publicDir,
                    pequeno.config.outputDir,
                );
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
