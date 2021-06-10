import React from 'react';
import styled from 'styled-components';
import theme from '../../../theme';

const StyledVerticalSpace = styled.div`
    margin-top: ${(props) => {
        return 'calc(' + (props.size || 1) + ' * ' + theme.spaceUnit + ')';
    }};
`;

export default function VerticalSpace({ size, ...props }) {
    return <StyledVerticalSpace aria-hidden="true" $size={size} {...props} />;
}
