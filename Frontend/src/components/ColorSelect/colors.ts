export const colors = [
    "#40c057", // green
    "#228be6", // blue
    "#7950f2", // violet
    "#fab005", // yellow
    "#15aabf", // cyan
    "#fa5252", // red
    "#4c6ef5", // indigo
    "#12b886", // teal
    "#fd7e14", // orange
    "#868e96", // gray
    "#e64980", // pink
    "#ae3ec9", // grape
    "#82c91e", // lime
    "#212529", // dark
];

export const colorMap: Record<string, string> = {
    gray: "#868E96",
    red: "#FA5252",
    pink: "#E64980",
    grape: "#BE4BDB",
    violet: "#7950F2",
    indigo: "#4C6EF5",
    blue: "#228BE6",
    cyan: "#15AABF",
    custom1: "#00a65a",
    teal: "#12B886",
    green: "#40C057",
    lime: "#82C91E",
    yellow: "#FAB005",
    orange: "#FD7E14",
};

export const reverseColorMap: Record<string, string> = Object.fromEntries(
    Object.entries(colorMap).map(([name, hex]) => [hex, name])
);
