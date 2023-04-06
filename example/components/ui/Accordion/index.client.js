var colorPrimary = getComputedStyle(document.documentElement).getPropertyValue(
    '--color-primary',
);

var color = getComputedStyle(document.documentElement).getPropertyValue(
    '--color',
);

var colorBackground = getComputedStyle(
    document.documentElement,
).getPropertyValue('--background');

var fisarmonica = new Fisarmonica({
    selector: accordion_selector,
    theme: {
        fisarmonicaBorderColor: colorPrimary,
        fisarmonicaBorderColorFocus: colorPrimary,
        fisarmonicaInnerBorderColorFocus: colorPrimary,
        fisarmonicaButtonBackgroundFocus: colorPrimary,
        fisarmonicaButtonBackground: 'colorBackground',
        fisarmonicaButtonColor: colorPrimary,
        fisarmonicaButtonColorFocus: colorBackground,
        fisarmonicaArrowColor: colorPrimary,
        fisarmonicaArrowColorFocus: colorBackground,
        fisarmonicaPanelBackground: colorBackground,
        fisarmonicaPanelColor: color,
    },
});
