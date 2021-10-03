const _ = require('lodash');

module.exports = function () {
    return new Promise((resolve) => {
        const html = `<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
         Vivamus quam lectus, cursus vel magna quis, sagittis eleifend eros.
          Donec at aliquam dolor. <strong>Vivamus vitae urna massa.</strong>
           Suspendisse vel nulla sit amet metus pellentesque maximus a a leo.
            Vivamus semper a odio quis dapibus. Donec eu vehicula metus.
             Etiam euismod diam sit amet nunc posuere, ornare aliquam sem pretium.</p>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.
         Vivamus quam lectus, cursus vel magna quis, sagittis eleifend eros.
          Donec at aliquam dolor. <strong>Vivamus vitae urna massa.</strong>
           Suspendisse vel nulla sit amet metus pellentesque maximus a a leo.
            Vivamus semper a odio quis dapibus. Donec eu vehicula metus.
             Etiam euismod diam sit amet nunc posuere, ornare aliquam sem pretium.</p>`;
        const news = _.times(36, (i) => ({
            title: `News title ${i + 1}`,
            slug: `news-${i + 1}-slug`,
            abstract: `News ${i + 1} abstract`,
            body: html,
            image: `https://picsum.photos/id/${i + 1}/1280/853`,
            category: i % 2 ? 'Sport' : 'Business',
        }));

        setTimeout(() => {
            resolve(news);
        }, 1000);
    });
};
