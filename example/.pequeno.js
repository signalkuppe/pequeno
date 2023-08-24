const path = require('path');
const { Readable } = require('stream');
const { SitemapStream, streamToPromise } = require('sitemap');
const fs = require('fs-extra');

module.exports = {
    copy: {
        'node_modules/fisarmonica/src/fisarmonica.js':
            'libs/fisarmonica/fisarmonica.js',
        'node_modules/fisarmonica/src/fisarmonica.css':
            'libs/fisarmonica/fisarmonica.css',
    },
    processHtml: function ($, data) {
        $('head').append(`
        <script>
            if ('serviceWorker' in navigator) {
                window.addEventListener('load', () => {
                    navigator.serviceWorker.register('/service-worker.js');
                });
            }
        </script>`);
        return $.html();
    },
    afterBuild: async function (renderedPages) {
        // create a sitemap
        const sitemapLinks = renderedPages.map((page) => ({
            url: page.data.route.href,
            changefreq: 'daily',
            priority: 0.3,
        }));
        const stream = new SitemapStream({
            hostname: 'https://priceless-euclid-d30b74.netlify.app',
        });
        const data = await streamToPromise(
            Readable.from(sitemapLinks).pipe(stream),
        );
        await fs.writeFile(
            path.join(pequeno.config.outputDir, 'sitemap.xml'),
            data.toString(),
            'utf8',
        );
    },
};
