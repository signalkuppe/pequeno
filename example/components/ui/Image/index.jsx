import React from 'react';
import styled from 'styled-components';

const StyledImage = styled.img`
    max-width: 100%;
    height: auto;
    display: block;
    aspect-ratio: attr(width) / attr(height);
`;

export default function Img({ ...props }) {
    return <StyledImage src={props.src} alt={props.alt || ''} {...props} />;
}
