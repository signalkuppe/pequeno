import React from 'react';
import styled from 'styled-components';
import vars from '../vars';
import BaseLayout from '../components/layout/Base';
import Head from '../components/layout/Head';
import Image from '../components/ui/Image';
import List from '../components/ui/List';
import Link from '../components/ui/Link';
import VerticalSpace from '../components/ui/VerticalSpace';
import { newsLink } from './news-item';

export const paginate = {
    data: 'photos',
    size: 1,
};

export const photoLink = function (photo) {
    return `/news/${photo.slug}/index.html`;
};

export const permalink = function (data) {
    const photos = data.pagination.items[0];
    return photoLink(photos);
};

export default function NewsItem({ route, pagination }) {
    const photo = pagination.items[0];
    const showNext =
        pagination.nextItem && pagination.nextItem.news === photo.news;
    const showPrev =
        pagination.prevItem && pagination.prevItem.news === photo.news;
    return (
        <BaseLayout
            route={route}
            head={
                <Head
                    title={photo.title}
                    slogan={vars.siteName}
                    description={photo.alt}
                />
            }
        >
            <h1>{photo.title}</h1>
            <Link href={newsLink(photo.news)}>
                &laquo; back to {photo.news.title}
            </Link>
            <VerticalSpace size={0.5} />
            <Image
                src={photo.image}
                width="1280"
                height="853"
                alt={photo.alt}
            />
            <VerticalSpace />
            <StyledList reset inline>
                {showPrev && (
                    <li>
                        <Link href={pagination.prev}>
                            &laquo; {pagination.prevItem.title}
                        </Link>
                    </li>
                )}
                {showNext && (
                    <li>
                        <Link href={pagination.next}>
                            {pagination.nextItem.title} &raquo;
                        </Link>
                    </li>
                )}
            </StyledList>
            <VerticalSpace size={5} />
        </BaseLayout>
    );
}

const StyledList = styled(List)`
    display: flex;
    justify-content: space-between;
`;
