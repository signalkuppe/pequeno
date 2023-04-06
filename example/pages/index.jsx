import React from 'react';
import styled, { keyframes } from 'styled-components';
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
            <StyledH1>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="-11.5 -10.232 23 20.463"
                    aria-hidden="true"
                >
                    <circle r="2.05" fill="#61dafb" />
                    <g stroke="#61dafb" fill="none">
                        <ellipse rx="11" ry="4.2" />
                        <ellipse rx="11" ry="4.2" transform="rotate(60)" />
                        <ellipse rx="11" ry="4.2" transform="rotate(120)" />
                    </g>
                </svg>

                {vars.siteName}
            </StyledH1>
            <p>{vars.siteSlogan}</p>
            <figure>
                <StyledImage
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

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledH1 = styled.h1`
    display: flex;
    gap: 10px;
    align-items: center;
    svg {
        width: 40px;
        height: 40px;
        @media (prefers-reduced-motion: reduce) {
            animation: none;
        }
        @media (prefers-reduced-motion: no-preference) {
            animation: ${rotate} 15s linear infinite;
        }
    }
`;

const StyledImage = styled(Image)`
    filter: contrast(1.3);
`;
