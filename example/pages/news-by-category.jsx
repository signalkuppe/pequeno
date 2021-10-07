import React from 'react';
import { uniq, map } from 'lodash';
import NewsPage from '../features/news/NewsPage';

export const paginate = {
    data: 'news',
    size: 8,
    groupBy: 'category',
};

export const CategoryNewsPageLink = function (page, group) {
    group = group.toLowerCase();
    if (page === 1) {
        return `/news/${group}/index.html`;
    } else {
        return `/news/${group}/${page}/index.html`;
    }
};

export const permalink = function (data) {
    const { page, group } = data.pagination;
    return CategoryNewsPageLink(page, group);
};

export default function News({ pagination, route, news: allNews }) {
    const news = pagination.items;
    const categories = uniq(map(allNews, 'category'));
    return (
        <NewsPage
            news={news}
            categories={categories}
            pagination={pagination}
            route={route}
        />
    );
}
