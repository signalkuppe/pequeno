import React from 'react';
import { uniq, map } from 'lodash';
import NewsPage from '../features/news/NewsPage';

export const paginate = {
    data: 'news',
    size: 8,
};

export const newsPageLink = function (page) {
    if (page === 1) {
        return `/news/index.html`;
    } else {
        return `/news/${page}/index.html`;
    }
};

export const permalink = function (data) {
    const { page } = data.pagination;
    return newsPageLink(page);
};

export default function News({ pagination, route }) {
    const news = pagination.items;
    const categories = uniq(map(news, 'category'));
    return (
        <NewsPage
            news={news}
            categories={categories}
            pagination={pagination}
            route={route}
        />
    );
}
