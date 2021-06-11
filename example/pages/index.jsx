import React from 'react';
import vars from '../vars';
import Head from '../components/layout/Head';
import BaseLayout from '../components/layout/Base';
import VerticalSpace from '../components/ui/VerticalSpace';
import Image from '../components/ui/Image';

export const permalink = '/index.html';

export default function HomePage({ route }) {
    const description = `Even today the ruins of the Hotel Pequeno are clearly visible from the valley:
    it is in fact that large white structure placed on the relief overlooking Barzio,
    impossible not to notice it, so much so that many tourists who have just arrived in the village
    mistakenly identify the former Hotel Pequeno as part of the current accommodation facilities.`;

    return (
        <BaseLayout
            route={route}
            head={
                <Head
                    title={vars.siteName}
                    slogan={vars.siteSlogan}
                    description="An awesome meta description"
                />
            }
        >
            <h1>{vars.siteName}</h1>
            <figure>
                <Image
                    src="/img/pequeno.jpg"
                    alt="Albergo Pequeno"
                    width="1024"
                    height="683"
                />
                <figcaption>
                    Albergo Pequeno, seen from{' '}
                    <a
                        target="_blank"
                        rel="noopener"
                        href="https://en.wikipedia.org/wiki/Cremeno"
                    >
                        Cremeno
                    </a>
                </figcaption>
            </figure>
            <VerticalSpace size={1.5} />
            <p>{description}</p>
        </BaseLayout>
    );
}
