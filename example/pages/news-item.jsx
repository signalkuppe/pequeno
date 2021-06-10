import React from 'react';
import vars from '../vars';
import BaseLayout from '../components/layout/Base';
import Head from '../components/layout/Head';
import Image from '../components/ui/Image';

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
        </BaseLayout>
    );
}
