import React from 'react';
import styled from 'styled-components';

const StyledVerticalSpace = styled.div`
    margin-top: ${(props) => {
        return 'calc(' + (props.$size || 1) + ' * ' + 'var(--space-unit)' + ')';
    }};
`;

export default function VerticalSpace({ size, ...props }) {
    return <StyledVerticalSpace aria-hidden="true" $size={size} {...props} />;
}
