import React from 'react';
import styled from 'styled-components';

export default function HorizontalRule({ ...props }) {
    return <StyledHr {...props} />;
}

const StyledHr = styled.hr`
    height: 1px;
    border: none;
    background: var(--color-borders);
    margin: 0;
`;
