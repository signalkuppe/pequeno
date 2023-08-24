import React from 'react';
import styled from 'styled-components';

export default function Image({ ...props }) {
    return <StyledImage {...props} />;
}

const StyledImage = styled.img`
    max-width: 100%;
    height: auto;
    display: block;
    aspect-ratio: attr(width) / attr(height);
`;
