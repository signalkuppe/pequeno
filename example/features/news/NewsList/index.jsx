import React from 'react';
import List from '../../../components/ui/List';
import Link from '../../../components/ui/Link';
import Pagination from '../../../components/ui/Pagination';
import VerticalSpace from '../../../components/ui/VerticalSpace';
import { newsLink } from '../../../pages/news-item';

export default function NewsList({ news, pagination }) {
    return (
        <>
            <List reset>
                {news.map((n, i) => (
                    <li key={i}>
                        <Link underline href={newsLink(n)}>
                            <h2>{n.title}</h2>
                        </Link>
                    </li>
                ))}
            </List>
            <VerticalSpace size={2} />
            <Pagination pagination={pagination} />
        </>
    );
}
