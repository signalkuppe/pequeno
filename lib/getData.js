const path = require('path');
const ora = require('ora');
const fg = require('fast-glob');
const { seriesMap } = require('./utils');

const getData = async function (pequeno) {
    let data = {};
    let dataFiles;
    const lookFor = `${path.join(
        pequeno.baseDir,
        pequeno.config.dataDir,
    )}/*.js`;
    dataFiles = await fg([lookFor]);
    if (!dataFiles.length) {
        pequeno.log.verbose('No data files found');
    } else {
        const spinner = ora().start();
        return await seriesMap(dataFiles, async (dataFile) => {
            const dataFileName = path.parse(dataFile).name;
            const cachedCollection = pequeno.cache.get(dataFileName);
            if (!cachedCollection) {
                spinner.text = `Fetching async data for ${dataFileName}\n`;
                const dataFilePromise = require(dataFile);
                const result = await dataFilePromise();
                pequeno.cache.set(dataFileName, result, 1000000);
                data[dataFileName] = result;
            } else {
                spinner.stop();
                pequeno.log.verbose(
                    'Collection %s fetched from CACHE',
                    dataFileName,
                );
                data[dataFileName] = cachedCollection;
            }
        })
            .then(() => {
                spinner.stop();
                return data;
            })
            .catch((err) => {
                pequeno.log.error('Data fetch error', err);
                throw new Error(err);
            });
    }
};

module.exports = getData;
