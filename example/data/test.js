module.exports = function () {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ foo: 'bar!' });
        }, 2000);
    });
};
