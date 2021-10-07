import React from 'react';
import styled, { css } from 'styled-components';
import List from '../../../components/ui/List';
import Link from '../../../components/ui/Link';
import VerticalSpace from '../../../components/ui/VerticalSpace';

const StyledList = styled(List)``;

const StyledLink = styled(Link)`
    ${(props) =>
        props.active &&
        css`
            font-weight: ${(props) => (props.active ? 'bold' : 'regular')};
            border: 1px solid var(--color-primary);
            padding: 0.1em 0.3em;
        `}
`;

const StyledLi = styled.li``;

export default function Pagination({ pagination }) {
    return (
        <>
            <StyledList reset inline>
                {pagination.prev && (
                    <StyledLi>
                        <StyledLink href={pagination.prev}>
                            &laquo; Prev
                        </StyledLink>
                    </StyledLi>
                )}
                {pagination.next && (
                    <StyledLi>
                        <StyledLink href={pagination.next}>
                            Next &raquo;
                        </StyledLink>
                    </StyledLi>
                )}
            </StyledList>
            <VerticalSpace size={2} />
            <StyledList reset inline>
                {pagination.pages.map((page, i) => (
                    <StyledLi key={i}>
                        <StyledLink
                            active={pagination.page === i + 1}
                            href={page}
                            title={`Go to page ${i + 1}`}
                        >
                            {i + 1}
                        </StyledLink>
                    </StyledLi>
                ))}
            </StyledList>
        </>
    );
}
