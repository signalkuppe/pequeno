import React from 'react';
import styled, { css } from 'styled-components';

export default function Link({ underline, children, ...props }) {
    return (
        <StyledA underline={underline} {...props}>
            {children}
        </StyledA>
    );
}

const StyledA = styled.a`
    ${(props) =>
        props.underline &&
        css`
            text-decoration: underline;
        `}
`;
