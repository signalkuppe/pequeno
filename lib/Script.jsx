import React from 'react';

export default function Script({ libs, children }) {
    return (
        <div
            hidden
            className="client-script"
            data-libs={JSON.stringify(libs)}
            dangerouslySetInnerHTML={{ __html: children }}
        />
    );
}
