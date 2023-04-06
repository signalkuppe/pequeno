import React from 'react';
import styled, { css } from 'styled-components';

export default function List({ inline, reset, ordered, children, ...props }) {
    return (
        <StyledList
            inline={inline}
            reset={reset}
            as={ordered ? 'ol' : 'ul'}
            {...props}
        >
            {children}
        </StyledList>
    );
}

const StyledList = styled.ul`
    ${(props) =>
        props.reset &&
        css`
            margin: 0;
            padding: 0;
            list-style: none;
        `}
    ${(props) =>
        props.inline &&
        css`
            display: flex;
            > * + * {
                margin-left: 1em;
            }
        `}
`;
