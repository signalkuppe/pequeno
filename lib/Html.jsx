import React from 'react';

export default function Html({ children }) {
    return (
        <div
            className="html-block"
            dangerouslySetInnerHTML={{ __html: children || '' }}
        />
    );
}
