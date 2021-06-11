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
