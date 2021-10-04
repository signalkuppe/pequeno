import React from 'react';
import Script from '../../../../lib/Script';
import client from './index.client.js';

export default function TestJs() {
    return (
        <>
            <div id="test-js" />
            <Script>{client}</Script>
        </>
    );
}
