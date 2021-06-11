import React from 'react';
import vars from '../vars';
import BaseLayout from '../components/layout/Base';
import Head from '../components/layout/Head';
import Image from '../components/ui/Image';
import List from '../components/ui/List';
import Link from '../components/ui/Link';
import VerticalSpace from '../components/ui/VerticalSpace';

export const paginate = {
    data: 'news',
    size: 1,
};

export const data = {
    foo: 'bar',
};

export const newsLink = function (news) {
    return `/news/${news.slug}/index.html`;
};

export const permalink = function (data) {
    const news = data.pagination.items[0];
    return newsLink(news);
};

export default function NewsItem({ route, pagination }) {
    const news = pagination.items[0];
    return (
        <BaseLayout
            route={route}
            head={
                <Head
                    title={news.title}
                    slogan={vars.siteName}
                    description={news.abstract}
                />
            }
        >
            <h1>{news.title}</h1>
            <Image src={news.image} width="1280" height="853" />
            <div dangerouslySetInnerHTML={{ __html: news.body }} />
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
        </BaseLayout>
    );
}
