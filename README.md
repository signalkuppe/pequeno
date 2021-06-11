# Pequeño

> A simpler [React](https://reactjs.org/) static site generator.

## Demo

[https://priceless-euclid-d30b74.netlify.app/](https://priceless-euclid-d30b74.netlify.app/)

## Why

**Jsx** emerged as the leading template engine, since it gives a great **developer experience** together with **styled components.**
Framework like [Gatsby](https://www.gatsbyjs.com/) or [NextJs](https://nextjs.org/) are great, but I wanted something lighter, dependency-free, using only vanilla js on the client.

## Installation

```shell
npm install pequeno --save
```

## Quick start

1. Create some pages in src/pages, giving them a paermalink like this

```js
import React from 'react';

export const permalink = '/empty.html';

export default function EmptyPage() {
    return <div>Empty page</div>;
}
```

2. Run Pequeno

```shell
npx pequeno
```

## Cli options

you can run the pequeno command with this options

-   `--verbose` for verbose output
-   `--clean` cleans the destination folder
-   `--serve` fires a server that watches for changes.
-   `--example` builds and example site.

## Configuration

Just place a `.pequeno.js` file in the root of you project to override the default settings

```js
module.exports = {
    // where to place bundled pages
    cacheDir: '.cache',
    // destination folder
    outputDir: '.site',
    // source folder
    srcDir: 'src',
    // where to search for data (relative to srcDir)
    dataDir: 'data',
    // public directory that will be copied to  outputDir (relative to srcDir)
    publicDir: 'public',
    // where to look for pages (relative to srcDir)
    pagesDir: 'pages',
    // an object that tells what to copy (key) and where (value)
    // usefull to copy external libs to the destination folder
    copy: {
        'node_modules/vanilla-lazyload/dist/lazyload.js':
            'libs/vanilla-lazyload/lazyload.js',
    },
    // and async function to be run after the build
    afterBuild: async function () {},
};
```

## Styling

Pequeno integrates [Styled Components](https://styled-components.com/) for styling. but you can also use plain css if you want.

A nice approach I found very usefull is to use `css custom properties` mapped to a theme object like this

**theme.js**

```js
export const vars = {
    '--color-primary': 'crimson',
    '--space-unit': '1.5em',
};

export const getVar = function (v) {
    return `var(${v})`;
};
```

**component usage**

```js
import React from 'react';
import styled from 'styled-components';
import { getVar } from '../../../theme';

const StyledVerticalSpace = styled.div`
    margin-top: ${(props) => {
        return (
            'calc(' + (props.size || 1) + ' * ' + getVar('--space-unit') + ')'
        );
    }};
`;

export default function VerticalSpace({ size, ...props }) {
    return <StyledVerticalSpace aria-hidden="true" $size={size} {...props} />;
}
```

**and finally add vars to the global style**

```js
import { createGlobalStyle, css } from 'styled-components';
import { vars, getVar } from './';

const rootVars = css`
    ${vars}
`;

const GlobalStyles = createGlobalStyle`
  :root {
    ${rootVars};
  }
`;
```

You get the best of the two worlds (css in js and custom properties).

## Dealing with client-side js

You can use a classic approach, or using the **built-in Script component** to add js in a more "component way" like this

```js
import React from 'react';
import { Script } from 'pequeno';
import client from './index.client.js';

export default function TestButton({ children }) {
    return (
        <>
            <button className="js-test-button">{children}</button>
            <Script>{client}</Script>
        </>
    );
}
```

**index.client.js**

```js
testButton.addEventListener('click', function () {
    alert('You clicked the test button');
});
```

Say you have **a component that need some vanilla client-side js logic** and maybe an external library, like an [accordion](https://github.com/signalkuppe/fisarmonica) thats adds some css and js
Just add the `<Script>` component in you code like this

```js
import React, { Fragment } from 'react';
import { Script } from 'pequeno';
import client from './index.client.js';

export default function Accordion({ items, ...props }) {
    return (
        <>
            <dl {...props}>
                {items.map((item, i) => (
                    <Fragment key={i}>
                        <dt>
                            <button>{item.title}</button>
                        </dt>
                        <dd>{item.description}</dd>
                    </Fragment>
                ))}
            </dl>
            <Script
                libs={[
                    {
                        where: 'head',
                        tag: '<script src="/libs/fisarmonica/fisarmonica.js" />',
                    },
                    {
                        where: 'head',
                        tag: '<link rel="stylesheet" href="/libs/fisarmonica/fisarmonica.css" />',
                    },
                ]}
                vars={[
                    {
                        name: 'accordion_selector',
                        value: `.${props.className} `,
                    },
                ]}
            >
                {client}
            </Script>
        </>
    );
}
```

The Script components has a `libs` prop where you can pass any external library you wish to use (proviously copied with the copy property in the config file). you can spicify the tag and also where to append it (head/body)

Then in **index.client.js**

```js
var colorPrimary = getComputedStyle(document.documentElement).getPropertyValue(
    '--color-primary',
);

var fisarmonica = new Fisarmonica({
    selector: accordion_selector,
    theme: {
        fisarmonicaBorderColor: colorPrimary,
        fisarmonicaBorderColorFocus: colorPrimary,
        fisarmonicaInnerBorderColorFocus: colorPrimary,
        fisarmonicaButtonBackgroundFocus: colorPrimary,
        fisarmonicaButtonColor: colorPrimary,
        fisarmonicaButtonColorFocus: 'white',
        fisarmonicaArrowColor: colorPrimary,
        fisarmonicaArrowColorFocus: 'white',
        fisarmonicaPanelBackground: 'white',
    },
});
```

And finally use it anywhere

```js
<Accordion items={accordionData} className="js-accordion" />
```

Notice that we used `accordion_selector` variable, passed by our Script tag withe the `vars` props and made available to the DOM.
At build time, the builder will extract all the libs and code used and place them in the document (code will be inserted before the closing of the body tag).

You can also insert **inline scripts** with the inline prop like this

```js
<Script inline>{client}</Script>
```

## Example site

see the `/example` folder for a complete website

## Included plugins

Svg imports are included, so you can do this

```js
import TestSvg from '../public/img/TestSvg.svg';
export default function SvgTest() {
    return <TestSvg width="20em" />;
}
```

## Performance

Pequeno uses [Esbuild](https://esbuild.github.io/) for bundling, so it should be quite fast.
However performance optimizations are still missing.

## Warnings

_⚠️ very much a work in progress_
