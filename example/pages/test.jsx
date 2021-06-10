import React from 'react';
import styled from 'styled-components';
import vars from '../vars';
import BaseLayout from '../components/layout/Base';
import Head from '../components/layout/Head';
import TestButton from '../components/ui/TestButton';
import TestExternalLib from '../components/ui/TestExternalLib';
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

export const permalink = '/test-page/index.html';

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
            <p>This variable comes from the data export</p>
            <strong>`{foo}`</strong>
            <VerticalSpace />
            <p>Svg test</p>
            <TestSvg width="20em" />
            <VerticalSpace />
            <StyledTest>styled component test</StyledTest>
            <VerticalSpace />
            <p>Testing client side js</p>
            <TestButton>Click me</TestButton>
            <VerticalSpace />
            <p>
                Testing external libs installed in node_modules: this is a{' '}
                <Link href="https://github.com/signalkuppe/fisarmonica">
                    vanilla js accordion plugin
                </Link>
            </p>
            <Accordion items={accordionData} />
            <VerticalSpace />
            <p>Testing an external lib (jquery)</p>
            <TestExternalLib />
        </BaseLayout>
    );
}
