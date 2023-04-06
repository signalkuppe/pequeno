import React from 'react';
import { omit } from 'lodash';
import styled from 'styled-components';
import Script from '../../../../lib/Script';
import client from './index.client.js';

export default function Image({ lazy, ...props }) {
    if (lazy) {
        return (
            <>
                <StyledImage
                    data-src={props.src}
                    data-lazy
                    {...omit(props, 'src')}
                />
                <Script
                    libs={[
                        {
                            where: 'body',
                            tag: '<script src="/libs/vanilla-lazyload/lazyload.js" />',
                        },
                    ]}
                >
                    {client}
                </Script>
            </>
        );
    } else {
        return <StyledImage {...props} />;
    }
}

const StyledImage = styled.img`
    max-width: 100%;
    height: auto;
    display: block;
    aspect-ratio: attr(width) / attr(height);
`;
