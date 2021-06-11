import React from 'react';
import vars from '../vars';
import BaseLayout from '../components/layout/Base';
import Head from '../components/layout/Head';
import List from '../components/ui/List';
import Link from '../components/ui/Link';
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
            <p>
                This page show a paginated list of{' '}
                <strong>items fetched from an API</strong> at build time. <br />
                Each item generates a page, with its own url.
            </p>
            <List reset>
                {news.map((n, i) => (
                    <li key={i}>
                        <Link underline href={`/news/${n.slug}/`}>
                            <h2>{n.title}</h2>
                        </Link>
                    </li>
                ))}
            </List>
            <VerticalSpace size={2} />
            <List reset inline>
                {pagination.prev && (
                    <li>
                        <Link href={pagination.prev}>&laquo; Prev</Link>
                    </li>
                )}
                {pagination.next && (
                    <li>
                        <Link href={pagination.next}>Next &raquo;</Link>
                    </li>
                )}
            </List>
            <VerticalSpace size={2} />
            <List reset inline>
                {pagination.pages.map((page, i) => (
                    <li key={i}>
                        <Link
                            underline={pagination.page === i + 1}
                            href={page}
                            title={`Go to page ${i + 1}`}
                        >
                            {i + 1}
                        </Link>
                    </li>
                ))}
            </List>
        </BaseLayout>
    );
}
