import React from 'react';
import { findIndex } from 'lodash';
import Tabs from '../../../components/ui/Tabs';
import HorizontalRule from '../../../components/ui/HorizontalRule';
import VerticalSpace from '../../../components/ui/VerticalSpace';
import { newsPageLink } from '../../../pages/news';
import { CategoryNewsPageLink } from '../../../pages/news-by-category';

export default function NewsTabs({ categories, category }) {
    const tabs = [
        { text: 'All', href: newsPageLink(1) },
        ...categories.map((cat) => ({
            text: cat,
            href: CategoryNewsPageLink(1, cat),
        })),
    ];

    let activeTab = 0;

    if (category) {
        activeTab = findIndex(tabs, (t) => t.text === category);
    }

    return (
        <>
            <Tabs items={tabs} active={activeTab} />
            <VerticalSpace size={0.5} />
            <HorizontalRule />
        </>
    );
}
