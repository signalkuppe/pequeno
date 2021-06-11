import React from 'react';
import vars from '../../../vars';
import Script from '../../../../lib/Script';
import client from './index.client.js';

export default function Head({
    title,
    slogan,
    description,
    url,
    ogImage,
    twitterCardImage,
}) {
    let titleTag = `${title || '-title-'} | ${slogan || '-slogan-'}`;
    ogImage = ogImage || `${vars.websiteUrl}/img/social/og-image.png`;
    twitterCardImage =
        twitterCardImage || `${vars.websiteUrl}/img/social/twitter-image.png`;

    return (
        <head>
            <meta charSet="UTF-8" />
            <meta
                name="viewport"
                content="width=device-width,initial-scale=1"
            />
            <link
                rel="manifest"
                href="/manifest.json"
                crossOrigin="use-credentials"
            />
            {title && (
                <>
                    <title>{titleTag}</title>
                    <meta name="title" content={title} />
                    <meta name="og:title" content={titleTag} />
                    <meta name="twitter:title" content={titleTag} />
                </>
            )}
            {description && (
                <>
                    <meta name="description" content={description} />
                    <meta name="og:description" content={description} />
                    <meta name="twitter:description" content={description} />
                </>
            )}
            {url && (
                <>
                    <meta name="og:url" content={url} />
                    <meta name="twitter:url" content={url} />
                </>
            )}
            <link
                rel="apple-touch-icon"
                sizes="180x180"
                href="/img/favicons/apple-touch-icon.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="32x32"
                href="/img/favicons/favicon-32x32.png"
            />
            <link
                rel="icon"
                type="image/png"
                sizes="16x16"
                href="/img/favicons/favicon-16x16.png"
            />

            <link
                rel="mask-icon"
                href="/img/favicons/safari-pinned-tab.svg"
                color="#009fe3"
            />
            <meta name="msapplication-TileColor" content="#ffffff" />
            <meta name="theme-color" content="#ffffff" />
            <meta name="generator" content="pequeno" />
            <meta name="og:type" content="website" />
            <meta name="twitter:site" content="@signalkuppe" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:image" content={twitterCardImage} />
            <meta name="og:image" content={ogImage} />
            <Script inline>{client}</Script>
        </head>
    );
}
