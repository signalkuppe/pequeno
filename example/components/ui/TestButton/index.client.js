(function () {
    Array.from(document.querySelectorAll('.js-test-button')).forEach(function (
        button,
    ) {
        button.addEventListener('click', function () {
            alert('You clicked the test button');
        });
    });
})();
