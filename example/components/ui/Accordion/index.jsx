import React, { Fragment } from 'react';
import Script from '../../../../lib/Script';
import client from './index.client.js';

export default function Accordion({ items }) {
    return (
        <>
            <dl id="js-accordion">
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
            >
                {client}
            </Script>
        </>
    );
}
