import { createTheme } from "@mantine/core";
import { components } from "./components";

export const mantineTheme = (primaryColor: string = "blue") => createTheme({
    fontFamily: 'Inter, sans-serif',
    primaryColor,
    autoContrast: true,
    colors: {
        darkGreen: [
            "#e6fbf1", // 0
            "#c9f3df", // 1
            "#9fe7c6", // 2
            "#6fdaab", // 3
            "#47cf95", // 4
            "#26c583", // 5
            "#00a65a", // 6 ← base
            "#008f4d", // 7
            "#007640", // 8
            "#005c32", // 9
        ],
        brown: [
            "#f7f3f2", // 0
            "#e8e6e5", // 1
            "#d2c9c6", // 2
            "#bdaaa4", // 3
            "#ab9087", // 4
            "#a17f74", // 5
            "#9d766a", // 6
            "#896459", // 7
            "#7b594e", // 8
            "#5d4037", // 9
        ],
        salmon: [
            "#fff1ef", // 0
            "#ffe3df", // 1
            "#ffc9c2", // 2
            "#ffada3", // 3
            "#ff9488", // 4
            "#ff7f73", // 5
            "#FA8072", // 6 ← base
            "#e46f62", // 7
            "#c85f53", // 8
            "#a94d44", // 9
        ],
        paleBlue: [
            "#ecf4ff", // 0
            "#dce4f5", // 1
            "#b9c7e2", // 2
            "#94a8d0", // 3
            "#748dc0", // 4
            "#5f7cb7", // 5
            "#5474b4", // 6 ← base
            "#44639f", // 7
            "#3a5890", // 8
            "#2c4b80", // 9
        ],
        skyBlue: [
            "#e1f8ff", // 0
            "#cbedff", // 1
            "#9ad7ff", // 2
            "#64c1ff", // 3
            "#3aaefe", // 4
            "#20a2fe", // 5
            "#099cff", // 6 ← base
            "#0088e4", // 7
            "#0079cd", // 8
            "#0068b6", // 9
        ],
        brightBlue: [
            "#e5f3ff", // 0
            "#cde2ff", // 1
            "#9ac2ff", // 2
            "#64a0ff", // 3
            "#3884fe", // 4
            "#1d72fe", // 5
            "#0063ff", // 6 ← base
            "#0058e4", // 7
            "#004ecd", // 8
            "#0043b5", // 9
        ],
        custom1: [
            "#e4fcfa", // 0
            "#d9f1ef", // 1
            "#b9dfdb", // 2
            "#96ccc7", // 3
            "#7dbeb8", // 4
            "#65b2ab", // 5
            "#59ada6", // 6 ← base
            "#469891", // 7
            "#388781", // 8
            "#22766f", // 9
        ],
        paleRed: [
            "#ffeaf3", // 0
            "#fcd4e1", // 1
            "#f4a7bf", // 2
            "#ec779c", // 3
            "#e64f7e", // 4
            "#e3366c", // 5
            "#e22862", // 6 ← base
            "#c91a52", // 7
            "#b41148", // 8
            "#9f003e", // 9
        ]
    },
    defaultRadius: 'md',
    headings: {
        fontFamily: 'Poppins, sans-serif',
    },
    components
})