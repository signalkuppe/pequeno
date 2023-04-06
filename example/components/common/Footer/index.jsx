import React from 'react';
import Script from '../../../../lib/Script';
import vars from '../../../vars';
import client from './index.client';

export default function Footer() {
    return (
        <p>
            <small>
                Footer &copy;<span id="copyright"></span>{' '}
                <a href={vars.github}>{vars.siteName}</a>
            </small>
            <Script>{client}</Script>
        </p>
    );
}
