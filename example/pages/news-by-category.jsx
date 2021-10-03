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
        <BaseLayout
            route={route}
            head={
                <Head
                    title={`${pagination.group} News${
                        pagination.page > 0 ? `, page ${pagination.page}` : ``
                    }`}
                    slogan={vars.siteName}
                    description="A list of news"
                />
            }
        >
            <h1>{pagination.group} news</h1>
            <NewsTabs categories={categories} active={pagination.group} />
            <NewsList news={news} pagination={pagination} />
            <VerticalSpace />
            <p>
                This page show a paginated list of{' '}
                <strong>items grouped by</strong> a specific prop (category)
            </p>
        </BaseLayout>
    );
}
