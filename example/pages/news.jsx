import React from 'react';
import { uniq, map } from 'lodash';
import vars from '../vars';
import BaseLayout from '../components/layout/Base';
import Head from '../components/layout/Head';
import NewsList from '../features/news/NewsList';
import NewsTabs from '../features/news/NewsTabs';
import VerticalSpace from '../components/ui/VerticalSpace';

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
        <BaseLayout
            route={route}
            head={
                <Head
                    title={`News${
                        pagination.page > 0 ? `, page ${pagination.page}` : ``
                    }`}
                    slogan={vars.siteName}
                    description="A list of news"
                />
            }
        >
            <h1>News</h1>
            <NewsTabs categories={categories} />
            <NewsList news={news} pagination={pagination} />
            <VerticalSpace />
            <p>
                This page show a paginated list of{' '}
                <strong>items fetched from an API</strong> at build time. <br />
                Each item generates a page, with its own url.
            </p>
        </BaseLayout>
    );
}
