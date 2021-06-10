import React from 'react';
import styled, { css } from 'styled-components';

const StyledA = styled.a`
    ${(props) =>
        props.underline &&
        css`
            text-decoration: underline;
        `}
`;

export default function List({ underline, children, ...props }) {
    return (
        <StyledA underline={underline} {...props}>
            {children}
        </StyledA>
    );
}
