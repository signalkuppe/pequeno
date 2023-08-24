import React from 'react';
import styled from 'styled-components';
import vars from '../vars';
import Html from '../../lib/Html';
import BaseLayout from '../components/layout/Base';
import Head from '../components/layout/Head';
import Image from '../components/ui/Image';
import List from '../components/ui/List';
import Link from '../components/ui/Link';
import VerticalSpace from '../components/ui/VerticalSpace';
import { CategoryNewsPageLink } from './news-by-category';
import { photoLink } from './news-photo';

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
            <p>
                posted in{' '}
                <Link href={CategoryNewsPageLink(1, news.category)}>
                    {news.category}
                </Link>
            </p>
            <ImageWrapper>
                <Image
                    src={news.image}
                    width="1280"
                    height="853"
                    loading="lazy"
                />
            </ImageWrapper>

            <Html>{news.body}</Html>
            <VerticalSpace size={3} />
            <h2>Photo gallery</h2>
            <PhotoList reset>
                {news.photos.map((photo, i) => (
                    <PhotoItem key={i}>
                        <Link href={photoLink(photo)} title={photo.title}>
                            <StyledImage
                                src={photo.image}
                                width="100"
                                height="100"
                                alt={photo.alt}
                                loading="lazy"
                            />
                        </Link>
                    </PhotoItem>
                ))}
            </PhotoList>
            <VerticalSpace size={5} />
            <StyledList reset inline>
                {pagination.prev && (
                    <li>
                        <Link href={pagination.prev}>
                            &laquo; {pagination.prevItem.title}
                        </Link>
                    </li>
                )}
                {pagination.next && (
                    <li>
                        <Link href={pagination.next}>
                            {pagination.nextItem.title} &raquo;
                        </Link>
                    </li>
                )}
            </StyledList>
        </BaseLayout>
    );
}

const StyledList = styled(List)`
    display: flex;
    justify-content: space-between;
`;

const ImageWrapper = styled.figure`
    background: var(--color-borders);
`;

const PhotoList = styled(List)`
    display: grid;
    grid-gap: 1em;
    grid-template-columns: repeat(auto-fit, 100px);
`;

const PhotoItem = styled.li`
    width: 100px;
    height: 100px;
`;

const StyledImage = styled(Image)`
    width: 100px;
    height: 100px;
    object-fit: cover;
`;
