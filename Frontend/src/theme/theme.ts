import { createTheme } from "@mantine/core";
import { components } from "./components";

export const mantineTheme = (primaryColor: string = "blue") => createTheme({
    fontFamily: 'Inter, sans-serif',
    primaryColor,
    colors: {
        custom1: [
            "#00a65a",
            "#00a65a",
            "#00a65a",
            "#00a65a",
            "#00a65a",
            "#00a65a",
            "#00a65a",
            "#00a65a",
            "#00a65a",
            "#00a65a"
        ]
    },
    primaryShade: {
        light: 6,
        dark: 8,
    },
    defaultRadius: 'md',
    headings: {
        fontFamily: 'Poppins, sans-serif',
    },
    components
})