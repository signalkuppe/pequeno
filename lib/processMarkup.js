const path = require('path');
const cheerio = require('cheerio');
const fs = require('fs-extra');
const _ = require('lodash');

module.exports = async function processMarkup(pequeno, markup, styles, data) {
    pequeno.log.verbose('Processing markup of %s', data.route.href);
    try {
        const $ = cheerio.load(markup);
        const styleString = styles.replace(/(<([^>]+)>)/gi, '');
        const stylesRelativePath = `/_css/${data.route.name}.css`;
        const styleOutputPath = path.join(
            process.cwd(),
            pequeno.config.outputDir,
            stylesRelativePath,
        );
        fs.outputFileSync(styleOutputPath, styleString, 'utf-8');
        $('head').append(
            `<link rel="stylesheet" href="${stylesRelativePath}"/>`,
        ); // append styled components styles

        /**
         * Add component scripts and libs to the dom
         * only once and in the right places
         * see Script component
         */

        let code = [];

        $('.client-script').each((i, el) => {
            const text = $(el).text();
            const data = $(el).data() || {};
            if (data.libs) {
                data.libs.map((lib) => {
                    const where = lib.where || 'head';
                    $(where).append(lib.tag);
                });
            }
            if (!code.includes(text)) {
                code.unshift(text);
            }
            $(el).remove();
        });

        if (code.length) {
            code.forEach((jsCode) => code.push(jsCode));
            const codeString = _.uniq(code).join(
                '\n\n/*-----------------------# code end #-----------------------*/\n\n',
            );
            const codeRelativePath = `/_js/${data.route.name}.js`;
            const codeOutputPath = path.join(
                process.cwd(),
                pequeno.config.outputDir,
                codeRelativePath,
            );

            fs.outputFileSync(codeOutputPath, codeString, 'utf-8');
            $('body').append(`<script src="${codeRelativePath}" />`);
        }

        return `<!doctype html>${$.html()}`;
    } catch (err) {
        pequeno.log.error(
            'An error occurred while processing the markup of %s %o',
            data.route.href,
            err,
        );
    }
};
