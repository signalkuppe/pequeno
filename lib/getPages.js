/**
 * Get pages to build
 */

const path = require('path');
const _ = require('lodash');
const fg = require('fast-glob');

const getPages = async function () {
    let entries = [];
    const pagesDir = path.join(pequeno.config.srcDir, pequeno.config.pagesDir);
    try {
        pequeno.log.verbose('searching for pages in %s', pagesDir);
        const lookFor = `${path.join(
            pequeno.baseDir,
            pequeno.config.pagesDir,
        )}/*.jsx`;
        entries = await fg([lookFor]);

        if (!_.isEmpty(entries)) {
            pequeno.log.verbose('found %d pages', entries.length);
            return entries;
        } else {
            pequeno.log.warn(
                'No pages found, start adding .jsx templates in %s',
                pagesDir,
            );
            process.exit();
        }
    } catch (err) {
        pequeno.log.error(`Page get error`, err);
        process.exit();
    }
};

module.exports = getPages;
