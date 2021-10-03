const async = require('async');
const _ = require('lodash');
const log = require('./log');

module.exports = {
    mapPromises: (arr, afn) => {
        return async.map(arr || [], afn);
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
