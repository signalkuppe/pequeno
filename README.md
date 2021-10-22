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

1. Create some pages in src/pages, giving them a permalink like this

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

you can run the pequeno command with these options

-   `--verbose` for verbose output
-   `--clean` cleans the destination folder
-   `--serve` fires a server that watches for changes.
-   `--path` builds only the specified path (--page=/news/index.html).
-   `--page` builds only the specified page (--page=news-item.jsx).
-   `--noAfterBuild` prevents the afterBuild function to run (see below)
-   `--noProcessHtml` prevents the processHtml function to run (see below)
-   `--example` builds the example site.

Page and path options are usefull during development to speed up page refresh or during build if you want to write only a specified page or path.

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
    // public directory that will be copied to outputDir (relative to srcDir)
    publicDir: 'public',
    // where to look for pages (relative to srcDir)
    pagesDir: 'pages',
    // an object that tells what to copy (key) and where (value)
    // useful to copy external libs to the destination folder
    copy: {
        'node_modules/vanilla-lazyload/dist/lazyload.js':
            'libs/vanilla-lazyload/lazyload.js',
    },
    // and async function to be run after the build (see below)
    afterBuild: async function () {},
};
```

## Data

You can provide data at build time by creating files into the `dataDir` folder.
Each data file should export a promise.

For example:

**data/news.js**

```js
module.exports = function () {
    const { config } = pequeno;
    return new Promise((resolve) => {
        fetch('https://my.custom.endpoint')
            .then((response) => response.json())
            .then((data) => {
                // eg: you can use the config object to output a file during data fetch
                fs.outputJsonSync(
                    path.join(
                        process.cwd(),
                        config.outputDir,
                        '_data',
                        'computed-json.json',
                    ),
                    data.map((item) => _.pick(item, ['category', 'title'])),
                );
                resolve(data);
            });
    });
};
```

Now you have a `news` collection available in your templates. In Every data promise function you cana ccess the pequeno instance. So, for example, you can get the config object.

## Pagination

You can paginate your data creating lists of content. Just export a **paginate object** giving the collection name in the data prop. For example you can create pages that lists chunks of 10 news in this way.

```js
export const paginate = {
    data: 'news',
    size: 10,
};

export const permalink = function (data) {
    const { page } = data.pagination;
    if (page === 1) {
        return `/news/index.html`;
    } else {
        return `/news/${page}/index.html`;
    }
};

export default function News({ pagination, route }) {
    const news = pagination.items;
    return (
        <ul>
            {news.map((n, i) => (
                <li key={i}>
                    <Link underline href={`/news/${n.slug}/`}>
                        <h2>{n.title}</h2>
                    </Link>
                </li>
            ))}
        </ul>
    );
}
```

You will get a pagination object with this data.

```js
{
    page: 1,
    total: 4,
    items: [],
    prev: null,
    next: '/news/2/index.html'
}
```

### Programmatically create pages from data.

Just use a **size of 1** in the pagination export and you'll get a page for each news

```js
export const paginate = {
    data: 'news',
    size: 1,
};

export const permalink = function (data) {
    const news = data.pagination.items[0];
    return `/news/${news.slug}/index.html`;
};

export default function News({ pagination, route }) {
    const news = pagination.items[0];
    return <h1>{news.title}</h1>;
}
```

In this case, the pagination object will contain also the prev and the next item payload

```js
{
    prevItem: { ...props }, // an object containing the item payload
    nextItem: { ...props }
}
```

### Grouping items

You can generates list of grouped content by adding a **groupBy** prop to the pagination object.
The groupBy prop must match an existing prop of your item object.

```js
export const paginate = {
    data: 'news',
    size: 8,
    groupBy: 'category',
};

export const CategoryNewsPageLink = function (page, group) {
    group = group.toLowerCase();
    if (page === 1) {
        return `/news/${group}/index.html`;
    } else {
        return `/news/${group}/${page}/index.html`;
    }
};

export const permalink = function (data) {
    const { page, group } = data.pagination;
    return CategoryNewsPageLink(page, group);
};
```

The pagination object will contain the group prop.
**Grouping is limited to string props.**

## Styling

Pequeno integrates [Styled Components](https://styled-components.com/) for styling. but you can also use plain css if you want.

**component usage**

```js
import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
    background: ${props => props.primary ? var(--color-primary) : var(--color-secondary)}
`;

export default function MyButton({ primary, ...props }) {
    return <StyledButton primary={primary} {...props} />;
}
```

See styled components docs for detailed usage.

## Dealing with client-side js

You can use a classic approach, or use the **built-in Script component** to add js in a more "component way" like this

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
Just add the `<Script>` component in your code like this

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

The Script components has a `libs` prop where you can pass any external library you wish to use (proviously copied with the copy property in the config file). you can specify the tag and also where to append it (head/body)

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

## Html strings

You can use the **built-in Html component** to output html strings.

```js
import React from 'react';
import { Html } from 'pequeno';
import { myHtmlString } from './example-data';

export default function TestHtml() {
    return <Html>{myHtmlString}</Html>;
}
```

## Svgs

Svg imports are included, so you can do this

```js
import TestSvg from '../public/img/TestSvg.svg';
export default function SvgTest() {
    return <TestSvg width="20em" />;
}
```

## After build

Using the **afterBuild** config prop you can execute async code after the website has been built.
The afterBuild function receives the renderedPages argument, which contains all the pages created with all the data including the markup.

For example you can create a sitemap.

```js
afterBuild: async function (renderedPages) {
    // create a sitemap
    const sitemapLinks = renderedPages.map((page) => ({
        url: page.data.route.href,
        changefreq: 'daily',
        priority: 0.3,
    }));
    const stream = new SitemapStream({
        hostname: 'https://priceless-euclid-d30b74.netlify.app',
    });
    const data = await streamToPromise(
        Readable.from(sitemapLinks).pipe(stream),
    );
    await fs.writeFile(
        path.join(pequeno.config.outputDir, 'sitemap.xml'),
        data.toString(),
        'utf8',
    );

    // move service worker
    await fs.copy(
        path.join(pequeno.baseDir, 'service-worker.js'),
        path.join(pequeno.config.outputDir, 'service-worker.js'),
    );
}
```

Each rendered page contains the following props

```js
{
    markup: `<html>....</html>`, // the page markup
    styles: `<style>...</style>`, // the extracted page styles (if using styled components)
    data: {
        route: {
            name: 'news-item',
            href: `/news/news-1-slug/index.html`,
            pagination: {}
        }
    },
}
```

## Process generated html

Using the **processHtml** config prop you can alter the generated html during the build process. The processHtml function receives the [cheerio](https://github.com/cheeriojs/cheerio) dom instance and the page data. For example you can inject a script in the head. You can use data to manipulate html only for some spacific pages. Be sure to return the **html()** method of the cheerio object. The processHtml function should be synchronous.

```js
processHtml: function ($, data) {
    // data: { route: { name, ...}}
    $('head').append(`
    <script>
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/service-worker.js');
            });
        }
    </script>`);
    return $.html();
},
```

## Example site

see the `/example` folder for a complete website

## Performance

Pequeno uses [Esbuild](https://esbuild.github.io/) for bundling, so it should be quite fast.
However performance optimizations are still missing.
