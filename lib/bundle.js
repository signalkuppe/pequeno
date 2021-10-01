/**
 * Bundle pages with webpack
 */

const path = require('path');
const esbuild = require('esbuild');
const ora = require('ora');
const svgrPlugin = require('esbuild-plugin-svgr');

const bundle = async function (pequeno, page) {
    const outName = path.basename(page).replace('.jsx', '.js');
    const outPath = path.join(process.cwd(), pequeno.config.cacheDir);
    const outFile = path.join(outPath, outName);
    const spinner = ora();
    spinner.start(`Bundling ${path.basename(page)}`);
    try {
        await esbuild.build({
            entryPoints: [page],
            bundle: true,
            platform: 'node',
            outfile: outFile,
            loader: { '.client.js': 'text' },
            external: ['styled-components', 'react', 'react-dom'],
            plugins: [svgrPlugin({ ref: true })],
        });
        spinner.succeed();
        spinner.stop();
    } catch (err) {
        pequeno.log.error('Having trouble bundling %s %o', outFile, err);
    }

    return outFile;
};

module.exports = bundle;
