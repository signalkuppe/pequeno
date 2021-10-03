import React from 'react';
import styled, { css } from 'styled-components';
import Link from '../../ui/Link';
import List from '../../ui/List';

export default function Tabs({ items, active, ...props }) {
    return (
        <List reset inline {...props}>
            {items.map((item, i) => (
                <li key={i}>
                    <Link href={item.href} underline={i === active}>
                        {item.text}
                    </Link>
                </li>
            ))}
        </List>
    );
}
