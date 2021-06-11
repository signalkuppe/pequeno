import React from 'react';
import Script from '../../../../lib/Script';
import client from './index.client.js';

export default function TestButton({ children }) {
    return (
        <>
            <button id="testButton">{children}</button>
            <Script>{client}</Script>
        </>
    );
}
