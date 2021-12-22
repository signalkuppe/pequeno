const path = require('path');
const async = require('async');
const normalize = require('normalize-path');
const _ = require('lodash');
const log = require('./log');

module.exports = {
    mapPromises: (arr, afn) => {
        return async.map(arr || [], afn);
    },
    mapPromisesSeries: (arr, afn) => {
        return async.mapSeries(arr || [], afn);
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
    joinPath: (...paths) => {
        return normalize(path.join(...paths));
    },
};
