// utils/colors.ts
export const colorMap: Record<string, string> = {
    dark: "#373A40",
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
