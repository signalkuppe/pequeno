import React from 'react';
import Html from '../../../../lib/Html';
import { htmlString, htmlString2 } from './example-data';

export default function TestHtml() {
    return (
        <>
            <Html>{htmlString}</Html>
            <Html>{htmlString2}</Html>
        </>
    );
}
