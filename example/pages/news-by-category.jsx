import React from 'react';
import vars from '../vars';
import BaseLayout from '../components/layout/Base';
import Head from '../components/layout/Head';
import List from '../components/ui/List';
import Link from '../components/ui/Link';
import VerticalSpace from '../components/ui/VerticalSpace';

export const paginate = {
    data: 'news',
    size: 4,
    groupBy: 'category',
};

export const newsPageLink = function (page, group) {
    group = group.toLowerCase();
    if (page === 1) {
        return `/news/${group}/index.html`;
    } else {
        return `/news/${group}/${page}/index.html`;
    }
};

export const permalink = function (data) {
    const { page, group } = data.pagination;
    return newsPageLink(page, group);
};

export default function News({ pagination, route }) {
    const news = pagination.items;
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
            test
        </BaseLayout>
    );
}
