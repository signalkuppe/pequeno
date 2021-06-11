import React from 'react';
import Script from '../../../../lib/Script';
import Modal from '../Modal';
import client from './index.client';

export default function TestModal() {
    return (
        <>
            <button id="open-modal">Open modal</button>
            <Modal id="1" title="Modal title">
                This is our beautiful modal content
            </Modal>
            <Script>{client}</Script>
        </>
    );
}
