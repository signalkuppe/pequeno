import React from 'react';
import List from '../../ui/List';
import Link from '../../ui/Link';
import { permalink as indexPermalink } from '../../../pages/index';
import { newsPageLink } from '../../../pages/news';
import { permalink as testPagePermalink } from '../../../pages/test';
import HorizontalRule from '../../ui/HorizontalRule';
import VerticalSpace from '../../ui/VerticalSpace';

export default function MainMenu({ route }) {
    const links = [
        {
            href: indexPermalink,
            text: 'Home',
            active: route.name === 'index',
        },
        {
            href: newsPageLink(1),
            text: 'News',
            active:
                route.name === 'news' ||
                route.name === 'news-item' ||
                route.name === 'news-photo' ||
                route.name === 'news-by-category',
        },
        {
            href: testPagePermalink,
            text: 'Test page',
            active: route.name === 'test',
        },
    ];
    return (
        <nav>
            <List reset inline>
                {links.map((link, i) => (
                    <li key={i}>
                        <Link href={link.href} underline={link.active}>
                            {link.text}
                        </Link>
                    </li>
                ))}
            </List>
            <VerticalSpace size={0.5} />
            <HorizontalRule />
        </nav>
    );
}
