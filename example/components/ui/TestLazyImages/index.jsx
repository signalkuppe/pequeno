import React from 'react';
import styled from 'styled-components';
import { times } from 'lodash';
import Image from '../Image';
import List from '../List';

export default function TestLazyImages() {
    const images = times(32, (i) => ({
        src: `https://picsum.photos/id/${i + 1}/400/400`,
        alt: `Description of image ${i + 1}`,
    }));

    return (
        <StyledList reset>
            {images.map((img, i) => (
                <li key={i}>
                    <Image
                        src={img.src}
                        alt={img.alt}
                        lazy
                        width="400"
                        height="400"
                    />
                </li>
            ))}
        </StyledList>
    );
}

const StyledList = styled(List)`
    display: grid;
    align-items: center;
    grid-template-columns: repeat(auto-fit, 150px);
    grid-gap: 1.5em;
`;
