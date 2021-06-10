/**
 * Bundle pages with webpack
 */

const path = require('path');
const esbuild = require('esbuild');
const svgrPlugin = require('esbuild-plugin-svgr');

const bundle = async function (pequeno, page) {
    pequeno.log.verbose('Bundling %s', page);
    const outName = path.basename(page).replace('.jsx', '.js');
    const outPath = path.join(process.cwd(), pequeno.config.cacheDir);
    const outFile = path.join(outPath, outName);
    try {
        await esbuild.build({
            entryPoints: [page],
            bundle: true,
            platform: 'node',
            outfile: outFile,
            loader: { '.client.js': 'text' },
            external: ['react', 'react-dom', 'styled-components'],
            plugins: [svgrPlugin({ ref: true })],
        });
        pequeno.log.verbose('Bundled %s', outFile);
        return outFile;
    } catch (err) {
        pequeno.log.error('Having trouble bundling %s %o', outFile, err);
        process.exit();
    }
};

module.exports = bundle;
