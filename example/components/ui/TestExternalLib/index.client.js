const div = $('#jquery-example-div');
const button = $('#jquery-example-button');
$(div).hide();
$(button).click(function () {
    $(div).fadeIn();
    $(button).hide();
});
