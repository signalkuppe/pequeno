import React from 'react';
import styled from 'styled-components';
import vars from '../vars';
import BaseLayout from '../components/layout/Base';
import Head from '../components/layout/Head';
import TestButton from '../components/ui/TestButton';
import TestExternalLib from '../components/ui/TestExternalLib';
import TestLazyImages from '../components/ui/TestLazyImages';
import TestModal from '../components/ui/TestModal';
import TestHtml from '../components/ui/TestHtml';
import TestJs from '../components/ui/TestJs';
import Accordion from '../components/ui/Accordion';
import VerticalSpace from '../components/ui/VerticalSpace';
import Link from '../components/ui/Link';
import TestSvg from '../public/img/TestSvg.svg';

const StyledTest = styled.div`
    user-select: none;
    transition: all 0.5s;
    border: 4px solid black;
    padding: 1em;
    hyphens: auto;
`;

export const permalink = '/test/index.html';

export const data = {
    foo: 'bar',
};

export default function Test({ route, foo }) {
    const title = 'Test page';
    const description = `This is a page to test some feature`;
    const accordionData = [
        {
            title: 'Title number 1',
            description: 'Description number 1',
        },
        {
            title: 'Title number 2',
            description: 'Description number 2',
        },
        {
            title: 'Title number 3',
            description: 'Description number 3',
        },
    ];
    const accordionData2 = [
        {
            title: 'Title number 4',
            description: 'Description number 4',
        },
        {
            title: 'Title number 5',
            description: 'Description number 5',
        },
        {
            title: 'Title number 6',
            description: 'Description number 6',
        },
    ];
    return (
        <BaseLayout
            route={route}
            head={
                <Head
                    title="Test page"
                    slogan={vars.siteName}
                    description="A test page"
                />
            }
        >
            <h1>{title}</h1>
            <p>{description}</p>
            <p>
                <strong>This variable comes from the data export</strong>
            </p>
            <pre>`{foo}`</pre>
            <VerticalSpace />
            <StyledTest>styled component test</StyledTest>
            <VerticalSpace />
            <p>
                <strong>Testing client side js</strong>
            </p>
            <TestButton>Click me</TestButton>
            <VerticalSpace />
            <p>
                <strong>
                    Testing external libs installed in node_modules: this is a{' '}
                    <Link
                        target="_blank"
                        rel="noopener"
                        href="https://github.com/signalkuppe/fisarmonica"
                        underline
                    >
                        vanilla js accordion plugin
                    </Link>
                </strong>
            </p>
            <Accordion items={accordionData} className="js-accordion" />
            <p>
                <strong>Another instance</strong>
            </p>
            <Accordion items={accordionData2} className="js-accordion-2" />
            <VerticalSpace />
            <p>
                <strong>
                    Testing an external with{' '}
                    <Link
                        target="_blank"
                        rel="noopener"
                        href="https://jquery.com/"
                        underline
                    >
                        jquery
                    </Link>
                </strong>
            </p>
            <TestExternalLib />
            <p>
                <strong>
                    Testing another vanilla js lib,{' '}
                    <Link
                        target="_blank"
                        rel="noopener"
                        href="https://micromodal.vercel.app/"
                        underline
                    >
                        Micromodal
                    </Link>
                </strong>
            </p>

            <TestModal />
            <VerticalSpace />
            <p>
                <strong>
                    Testing{' '}
                    <Link
                        target="_blank"
                        rel="noopener"
                        href="https://github.com/verlok/vanilla-lazyload"
                    >
                        lazy images plugin
                    </Link>
                </strong>
            </p>
            <TestLazyImages />
            <VerticalSpace />
            <p>
                <strong>Svg test</strong>
            </p>
            <TestSvg width="20em" />
            <VerticalSpace />
            <p>
                <strong>Html block test</strong>
            </p>
            <TestHtml />
            <p>
                <strong>Js strings test</strong>
            </p>
            <TestJs />
        </BaseLayout>
    );
}
