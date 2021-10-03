import React from 'react';
import List from '../../../components/ui/List';
import Link from '../../../components/ui/Link';
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
            <List reset inline>
                {pagination.prev && (
                    <li>
                        <Link href={pagination.prev}>&laquo; Prev</Link>
                    </li>
                )}
                {pagination.next && (
                    <li>
                        <Link href={pagination.next}>Next &raquo;</Link>
                    </li>
                )}
            </List>
            <VerticalSpace size={2} />
            <List reset inline>
                {pagination.pages.map((page, i) => (
                    <li key={i}>
                        <Link
                            underline={pagination.page === i + 1}
                            href={page}
                            title={`Go to page ${i + 1}`}
                        >
                            {i + 1}
                        </Link>
                    </li>
                ))}
            </List>
        </>
    );
}
