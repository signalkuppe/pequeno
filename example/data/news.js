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
        const news = _.times(64, (i_n) => {
            const news = {
                title: `News title ${i_n + 1}`,
                slug: `news-${i_n + 1}-slug`,
                abstract: `News ${i_n + 1} abstract`,
                body: html,
                image: `https://picsum.photos/id/${i_n + 1}/1280/853`,
                category: i_n % 2 ? 'Sport' : 'Business',
            };

            return {
                ...news,
                photos: _.times(6, (i_f) => ({
                    news: news,
                    slug: `news-${i_n + 1}-slug/photo/${i_f + 1}`,
                    image: `https://picsum.photos/id/${i_n + i_f + 1}/1280/853`,
                    title: `News image title ${i_f + 1}`,
                    alt: `News image alt ${i_f + 1}`,
                })),
            };
        });

        setTimeout(() => {
            resolve(news);
        }, 1000);
    });
};

module.exports.photos = function (news) {
    const photos = _.flatten(_.map(news, 'photos'));
    return photos;
};
