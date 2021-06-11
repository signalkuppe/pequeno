export const vars = {
    '--color-primary': 'crimson',
    '--space-unit': '1.5em',
};

export const getVar = function (v) {
    return `var(${v})`;
};
