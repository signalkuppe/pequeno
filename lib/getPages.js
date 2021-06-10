/**
 * Get pages to build
 */

const path = require('path');
const _ = require('lodash');
const fg = require('fast-glob');

const getPages = async function (pequeno, page) {
    let entries = [];
    try {
        if (!page) {
            const pagesDir = path.join(
                pequeno.config.srcDir,
                pequeno.config.pagesDir,
            );
            pequeno.log.verbose('searching for pages in %s', pagesDir);
            const lookFor = `${path.join(
                pequeno.baseDir,
                pequeno.config.pagesDir,
            )}/*.jsx`;
            entries = await fg([lookFor]);
        } else {
            entries = [page];
            pequeno.log.verbose(
                `Requested build for page "%s"`,
                path.parse(page).name,
            );
        }

        if (!_.isEmpty(entries)) {
            pequeno.log.verbose('found %d pages', entries.length);
            return entries;
        } else {
            pequeno.log.warn(
                'No pages found, start adding .jsx templates in %s',
                pequeno.config.pagesDir,
            );
            process.exit();
        }
    } catch (err) {
        pequeno.log.error(`Page get error`, err);
        process.exit();
    }
};

module.exports = getPages;
