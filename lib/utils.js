const Promise = require('bluebird');
const _ = require('lodash');
const log = require('./log');
Promise.config({ warnings: true });

module.exports = {
    seriesMap: (arr, afn, concurrency) => {
        concurrency = concurrency || 4;
        return Promise.mapSeries(arr || [], afn, { concurrency });
    },
    paginateCollection: (collection, perPage) => {
        if (!Array.isArray(collection)) {
            log.error(
                'PaginateCollection: expect array for collection and got %s',
                typeof collection,
            );
            process.exit(1);
        } else {
            return _.chunk(collection, perPage);
        }
    },
};
