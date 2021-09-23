/**
 * Renders the page bundle
 */

const path = require('path');
const _ = require('lodash');
const ReactDOMServer = require('react-dom/server');
const { ServerStyleSheet } = require('styled-components');
const processMarkup = require('./processMarkup');
const { paginateCollection } = require('./utils');
const { group } = require('console');

const render = function (pequeno, bundle, data) {
    pequeno.log.verbose('rendering %s', bundle);
    delete require.cache[path.resolve(bundle)];
    const pageName = path.parse(bundle).name;
    let bundlePages = [];
    const addPage = function (component, data) {
        try {
            const withData = component.default(data);
            const sheet = new ServerStyleSheet();
            const markup = ReactDOMServer.renderToStaticMarkup(
                sheet.collectStyles(withData),
            );
            const styles = sheet.getStyleTags();
            const finalMarkup = processMarkup(pequeno, markup, styles, data);

            bundlePages.push({
                markup: finalMarkup,
                data,
            });

            sheet.seal();
        } catch (err) {
            pequeno.log.error('Having trouble rendering %s %o', pageName, err);
        }
    };

    try {
        const component = require(bundle);
        const componentData = component.data;
        const componentPermalink = component.permalink;
        const componentPagination = component.paginate;
        let extendedData = { ...data, route: { name: pageName } };

        if (component.default) {
            if (componentData) {
                pequeno.log.verbose('Page %s has a data export', pageName);
                extendedData = { ...extendedData, ...componentData };
            }

            if (componentPagination) {
                pequeno.log.verbose('Page %s has pagination', pageName);
                if (
                    !componentPermalink ||
                    typeof componentPermalink !== 'function'
                ) {
                    pequeno.log.error(
                        'You must provide a permalink function for page %s',
                        pageName,
                    );
                    process.exit();
                } else {
                    if (
                        !componentPagination.data ||
                        !componentPagination.size ||
                        typeof componentPagination.size !== 'number' ||
                        componentPagination.size <= 0
                    ) {
                        pequeno.log.error(
                            'You must provide a data and a valid size prop in page %s',
                            pageName,
                        );
                        process.exit();
                    } else {
                        if (!data[componentPagination.data]) {
                            pequeno.log.error(
                                'Data %s doesn’t exist',
                                component.paginate.data,
                            );
                            process.exit();
                        } else {
                            let paginatedCollection = paginateCollection(
                                data[componentPagination.data],
                                componentPagination.size,
                            );

                            if (componentPagination.groupBy) {
                                paginatedCollection = _.flattenDepth(
                                    _.values(
                                        _.groupBy(
                                            data[componentPagination.data],
                                            componentPagination.groupBy,
                                        ),
                                    ).map((pc) =>
                                        paginateCollection(
                                            pc,
                                            componentPagination.size,
                                        ),
                                    ),
                                    1,
                                );
                            }

                            _.times(paginatedCollection.length, async (i) => {
                                let group;
                                const paginatedPageHref = function (
                                    page,
                                    items,
                                    group,
                                ) {
                                    return componentPermalink({
                                        ...extendedData,
                                        pagination: { page, items, group },
                                    });
                                };

                                if (componentPagination.groupBy) {
                                    group =
                                        paginatedCollection[i][0][
                                            componentPagination.groupBy
                                        ];
                                }

                                const _data = {
                                    ...extendedData,
                                    pagination: {
                                        page: i + 1,
                                        total: paginatedCollection.length,
                                        items: paginatedCollection[i],
                                        group: paginatedCollection[i][0][
                                            componentPagination.groupBy
                                        ],
                                        pages:
                                            componentPagination.size > 1
                                                ? _.times(
                                                      paginatedCollection.length,
                                                      (i) =>
                                                          paginatedPageHref(
                                                              i + 1,
                                                              null,
                                                              group,
                                                          ),
                                                  )
                                                : null,
                                        prev:
                                            i > 0
                                                ? paginatedPageHref(
                                                      i,
                                                      paginatedCollection[
                                                          i - 1
                                                      ],
                                                      group,
                                                  )
                                                : null,
                                        prevItem:
                                            i > 0 &&
                                            componentPagination.size === 1
                                                ? paginatedCollection[i - 1][0]
                                                : null,
                                        next:
                                            i < paginatedCollection.length - 1
                                                ? paginatedPageHref(
                                                      i + 2,
                                                      paginatedCollection[
                                                          i + 1
                                                      ],
                                                      group,
                                                  )
                                                : null,
                                        nextItem:
                                            i <
                                                paginatedCollection.length -
                                                    1 &&
                                            componentPagination.size === 1
                                                ? paginatedCollection[i + 1][0]
                                                : null,
                                    },
                                    route: {
                                        ...extendedData.route,
                                        href: paginatedPageHref(
                                            i + 1,
                                            paginatedCollection[i],
                                            group,
                                        ),
                                    },
                                };

                                addPage(component, _data);
                            });
                        }
                    }
                }
            } else {
                if (typeof componentPermalink === 'function') {
                    pequeno.log.error(
                        'Permalink functions are only allowed with pagination (in %s)',
                        pageName,
                    );
                    process.exit();
                } else {
                    if (!componentPermalink) {
                        pequeno.log.error('Page %s has no permalink', pageName);
                        process.exit();
                    } else {
                        pequeno.log.verbose(
                            'Page %s has a string permalink',
                            pageName,
                        );
                        extendedData.route.href = componentPermalink;
                    }
                }
                addPage(component, extendedData);
            }
        } else {
            pequeno.log.error(`missing  default export in %s`, bundle);
            process.exit();
        }

        pequeno.log.verbose('Rendered %s', bundle);
        return bundlePages;
    } catch (err) {
        pequeno.log.error(`Having trouble rendering %s %o`, bundle, err);
        return [];
    }
};

module.exports = render;
