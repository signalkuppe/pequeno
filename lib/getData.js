const path = require('path');
const ora = require('ora');
const fg = require('fast-glob');
const { mapPromisesSeries } = require('./utils');

const getData = async function () {
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
        return await mapPromisesSeries(dataFiles, async (dataFile) => {
            const dataFilePromise = require(dataFile);
            const dataFileName = path.parse(dataFile).name;

            if (typeof dataFilePromise !== 'function') {
                pequeno.log.warn(
                    'Data file %s doesn`t export an async function',
                    dataFileName,
                );
            } else {
                const cachedCollection = pequeno.cache.get(dataFileName);
                if (!cachedCollection) {
                    const time = process.hrtime();
                    const spinner = ora();
                    let spinnerText = `Fetching async data for ${dataFileName}`;
                    spinner.start(spinnerText);
                    const result = await dataFilePromise();
                    pequeno.cache.set(dataFileName, result, 1000000);
                    data[dataFileName] = result;
                    const ended = process.hrtime(time);
                    const secondsElapsed = (
                        ended[0] +
                        ended[1] / Math.pow(10, 9)
                    ).toFixed(1);
                    spinner.succeed(`${spinnerText} (${secondsElapsed}s)`);
                    spinner.stop();
                } else {
                    pequeno.log.verbose(
                        'Collection %s fetched from CACHE',
                        dataFileName,
                    );
                    data[dataFileName] = cachedCollection;
                }
            }
        })
            .then(() => {
                return data;
            })
            .catch((err) => {
                pequeno.log.error('Data fetch error', err);
                throw new Error(err);
            });
    }
};

module.exports = getData;
