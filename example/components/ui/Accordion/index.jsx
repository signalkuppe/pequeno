import React, { Fragment } from 'react';
import Script from '../../../../lib/Script';
import client from './index.client.js';

export default function Accordion({ items, ...props }) {
    return (
        <>
            <dl {...props}>
                {items.map((item, i) => (
                    <Fragment key={i}>
                        <dt>
                            <button>{item.title}</button>
                        </dt>
                        <dd>{item.description}</dd>
                    </Fragment>
                ))}
            </dl>
            <Script
                libs={[
                    {
                        where: 'head',
                        tag: '<script src="/libs/fisarmonica/fisarmonica.js" />',
                    },
                    {
                        where: 'head',
                        tag: '<link rel="stylesheet" href="/libs/fisarmonica/fisarmonica.css" />',
                    },
                ]}
                vars={[
                    {
                        name: 'accordion_selector',
                        value: `.${props.className} `,
                    },
                ]}
            >
                {client}
            </Script>
        </>
    );
}
