export const colors = [
    // Originales
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

    // Variantes de green
    "#ebfbee", "#d3f9d8", "#b2f2bb", "#8ce99a", "#69db7c", "#51cf66", "#37b24d", "#2f9e44",

    // Variantes de blue
    "#e7f5ff", "#d0ebff", "#a5d8ff", "#74c0fc", "#4dabf7", "#339af0", "#1c7ed6", "#1971c2",

    // Variantes de violet
    "#f3f0ff", "#e5dbff", "#d0bfff", "#b197fc", "#9775fa", "#845ef7", "#7048e8", "#6741d9",

    // Variantes de yellow
    "#fff9db", "#fff3bf", "#ffec99", "#ffe066", "#ffd43b", "#fcc419", "#f59f00", "#f08c00",

    // Variantes de cyan
    "#e3fafc", "#c5f6fa", "#99e9f2", "#66d9e8", "#3bc9db", "#22b8cf", "#1098ad", "#0c8599",

    // Variantes de red
    "#fff5f5", "#ffe3e3", "#ffc9c9", "#ffa8a8", "#ff8787", "#ff6b6b", "#f03e3e", "#e03131",

    // Variantes de indigo
    "#edf2ff", "#dbe4ff", "#bac8ff", "#91a7ff", "#748ffc", "#5c7cfa", "#4263eb", "#3b5bdb",

    // Variantes de teal
    "#e6fcf5", "#c3fae8", "#96f2d7", "#63e6be", "#38d9a9", "#20c997", "#0ca678", "#099268",

    // Variantes de orange
    "#fff4e6", "#ffe8cc", "#ffd8a8", "#ffc078", "#ffa94d", "#ff922b", "#f76707", "#e8590c",

    // Variantes de gray
    "#f8f9fa", "#f1f3f5", "#e9ecef", "#dee2e6", "#ced4da", "#adb5bd", "#495057", "#343a40",

    // Variantes de pink
    "#fff0f6", "#ffdeeb", "#fcc2d7", "#faa2c1", "#f783ac", "#f06595", "#d6336c", "#c2255c",

    // Variantes de grape
    "#f8f0fc", "#f3d9fa", "#eebefa", "#e599f7", "#da77f2", "#cc5de8", "#9c36b5", "#862e9c",

    // Variantes de lime
    "#f4fce3", "#e9fac8", "#d8f5a2", "#c0eb75", "#a9e34b", "#94d82d", "#74b816", "#5c940d",

    // Variantes de dark
    "#d7d7d7", "#bfbfbf", "#a6a6a6", "#8c8c8c", "#737373", "#595959", "#262626", "#0d0d0d",
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
    darkGreen: "#00a65a",
    paleBlue: "#5474b4",
    skyBlue: "#099cff",
    brightBlue: "#0063ff",
    custom1: "#59ada6",
    brown: "#9d766a",
    salmon: "#FA8072",
    teal: "#12B886",
    green: "#40C057",
    lime: "#82C91E",
    yellow: "#FAB005",
    orange: "#FD7E14",
};

export const reverseColorMap: Record<string, string> = Object.fromEntries(
    Object.entries(colorMap).map(([name, hex]) => [hex, name])
);

export const getCicloColor = (
    index: number,
    baseColor = "blue"
) => {
    const START_SHADE = 6
    const STEP = 1
    const MAX_SHADE = 9

    const shade = Math.min(START_SHADE + index * STEP, MAX_SHADE)

    const lightBgShade = Math.max(shade - 2, 0)
    const darkBgShade = Math.min(shade + 3, 9)

    const lightTextShade = Math.min(shade + 4, 9)
    const darkTextShade = Math.max(shade - 4, 0)

    return {
        color: baseColor,
        shade,

        bg: `light-dark(
      var(--mantine-color-${baseColor}-${lightBgShade}),
      var(--mantine-color-${baseColor}-${darkBgShade})
    )`,

        border: `light-dark(
      var(--mantine-color-${baseColor}-${shade}),
      var(--mantine-color-${baseColor}-${Math.max(shade - 1, 0)})
    )`,

        text: `light-dark(
      var(--mantine-color-${baseColor}-${lightTextShade}),
      var(--mantine-color-${baseColor}-${darkTextShade})
    )`,

        badge: `light-dark(
      var(--mantine-color-${baseColor}-${Math.min(shade + 1, 9)}),
      var(--mantine-color-${baseColor}-${Math.max(shade - 1, 0)})
    )`,
    }
}