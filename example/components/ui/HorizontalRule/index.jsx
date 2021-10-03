import React from 'react';
import styled from 'styled-components';

const StyledHr = styled.hr`
    height: 1px;
    border: none;
    background: var(--color-borders);
    margin: 0;
`;

export default function HorizontalRule({ ...props }) {
    return <StyledHr {...props} />;
}
