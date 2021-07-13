const path = require('path');
const cheerio = require('cheerio');
const fs = require('fs-extra');
const _ = require('lodash');

module.exports = async function processMarkup(pequeno, markup, styles, data) {
    pequeno.log.verbose('Processing markup of %s', data.route.href);
    try {
        const $ = cheerio.load(markup);

        /**
         * Unwrap html block, see Html component
         */

        $('.html-block').each((i, el) => {
            var contents = $(el).html();
            $(el).replaceWith(contents);
        });

        /**
         * Append styled component style tag to the head
         */

        const styleString = styles.replace(/(<([^>]+)>)/gi, '');
        if (styleString) {
            const stylesRelativePath = `/_css/${data.route.name}.css`;
            const styleOutputPath = path.join(
                process.cwd(),
                pequeno.config.outputDir,
                stylesRelativePath,
            );
            fs.outputFileSync(styleOutputPath, styleString, 'utf-8');
            $('head').append(
                `<link rel="stylesheet" href="${stylesRelativePath}"/>`,
            );
        }

        /**
         * Add component scripts and libs to the dom
         * only once and in the right places
         * see Script component, eg:
         * <Script
                libs={[
                    {
                        where: 'head',
                        tag: '<script src="/libs/fisarmonica/fisarmonica.js" />',
                    },
                    {
                        where: 'head',
                        tag: '<link rel="stylesheet" href="/libs/fisarmonica/fisarmonica.css" />',
                    },
                ]}
                vars={[
                    {
                        name: 'Accordion_selector',
                        value: `.${props.className} `,
                    },
                ]}
            >
                {client}
            </Script>
            * where {client} contains the js code to execute and vars contains come var to inject
         */

        let code = [];
        let libs = [];

        $('.client-script').each((i, el) => {
            const text = $(el).text();
            const data = $(el).data() || {};

            /**
             * External libs array
             *
             */

            if (data.libs && data.libs.length) {
                data.libs.map((lib) => {
                    libs.push(lib);
                });
            }

            /**
             * Inline code
             * with optional props, containing component's props
             */

            let finalCode = text;
            if (data.vars && data.vars.length) {
                try {
                    const vars = data.vars.map(
                        (v) => `const ${v.name} = '${v.value}';`,
                    );
                    finalCode = `${vars}\n\n${text}`;
                } catch (err) {
                    pequeno.log.warning(
                        'Cannot append props in a script tag of %s',
                        data.route.name,
                    );
                }
            }
            finalCode = `(function () {\n${finalCode}\n})();`; // use IIFE to scope vars
            code.push(finalCode);

            $(el).remove();
        });

        _.uniqBy(libs, (l) => l.tag).forEach((lib) => {
            const where = lib.where || 'head';
            $(where).append(lib.tag);
        });

        if (code.length) {
            code.forEach((jsCode) => code.push(jsCode));
            const codeString = _.uniq(code).join(
                '\n\n/*-----------------------# code block end #-----------------------*/\n\n',
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
