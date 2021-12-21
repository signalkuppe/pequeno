/**
 * Get pages to build
 */

const path = require('path');
const _ = require('lodash');
const fg = require('fast-glob');
const { joinPath } = require('./utils');

const getPages = async function (pequeno, page) {
    let entries = [];
    const pagesDir = joinPath(pequeno.config.srcDir, pequeno.config.pagesDir);
    try {
        if (!page) {
            pequeno.log.verbose('searching for pages in %s', pagesDir);
            const lookFor = joinPath(
                pequeno.baseDir,
                pequeno.config.pagesDir,
                `*.jsx`,
            );
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
