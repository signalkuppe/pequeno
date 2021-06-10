(function () {
    var colorPrimary = getComputedStyle(
        document.documentElement,
    ).getPropertyValue('--color-primary');

    var fisarmonica = new Fisarmonica({
        selector: '#js-accordion',
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
})();
