import React from 'react';
import Script from '../../../../lib/Script';
import client from './index.client.js';

export default function TestButton({ children }) {
    return (
        <>
            <button className="js-test-button">{children}</button>
            <Script>{client}</Script>
        </>
    );
}
