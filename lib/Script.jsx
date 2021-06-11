import React from 'react';

export default function Script({ inline, vars, libs, children }) {
    if (inline) {
        return (
            <script
                dangerouslySetInnerHTML={{ __html: children || '' }}
            ></script>
        );
    } else {
        return (
            <div
                hidden
                className="client-script"
                data-libs={JSON.stringify(libs || [])}
                data-vars={(props = JSON.stringify(vars || []))}
                dangerouslySetInnerHTML={{ __html: children || '' }}
            />
        );
    }
}
