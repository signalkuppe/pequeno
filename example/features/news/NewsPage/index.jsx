import React from 'react';
import vars from '../../../vars';
import BaseLayout from '../../../components/layout/Base';
import Head from '../../../components/layout/Head';
import NewsList from '../NewsList';
import NewsTabs from '../NewsTabs';
import VerticalSpace from '../../../components/ui/VerticalSpace';

export default function NewsPage({ news, categories, pagination, route }) {
    let title = 'News';

    let description = (
        <p>
            This page show a paginated list of{' '}
            <strong>items fetched from an API</strong> at build time. <br />
            Each item generates a page, with its own url.
        </p>
    );

    if (pagination.group) {
        title = pagination.group;
        description = (
            <p>
                this page show a list of news of the <strong>{title}</strong>{' '}
                category
            </p>
        );
    }

    return (
        <BaseLayout
            route={route}
            head={
                <Head
                    title={`${title}${
                        pagination.page > 1 ? `, page ${pagination.page}` : ``
                    }`}
                    slogan={vars.siteName}
                    description="A list of news"
                />
            }
        >
            <h1>{title}</h1>
            <NewsTabs categories={categories} category={pagination.group} />
            <NewsList news={news} pagination={pagination} />
            <VerticalSpace />
            {description}
        </BaseLayout>
    );
}
