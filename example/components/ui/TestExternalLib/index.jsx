import React from 'react';
import styled from 'styled-components';
import Script from '../../../../lib/Script';
import client from './index.client';

const FadeDiv = styled.div`
    border: 4px solid black;
    background: yellow;
    padding: 2em;
    text-align: center;
    margin-top: 1em;
`;

export default function TestExternalLib() {
    return (
        <>
            <button id="jquery-example-button">
                Click me to test if jquery has loaded
            </button>
            <FadeDiv id="jquery-example-div">Yup!</FadeDiv>
            <Script
                libs={[
                    {
                        where: 'head',
                        tag: '<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.6.0/jquery.min.js" />',
                    },
                ]}
            >
                {client}
            </Script>
        </>
    );
}
