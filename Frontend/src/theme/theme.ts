import { createTheme } from "@mantine/core";
import { components } from "./components";

export const mantineTheme = (primaryColor: string = "blue") => createTheme({
    fontFamily: 'Inter, sans-serif',
    primaryColor,
    colors: {
        custom1: [
            "#ebfff6",
            "#d5feeb",
            "#a6fdd4",
            "#74fdbc",
            "#52fda8",
            "#41fd9b",
            "#38fe93",
            "#2de27f",
            "#20c970",
            "#00a65a"
        ]
    },
    primaryShade: {
        light: 8,
        dark: 9,
    },
    defaultRadius: 'md',
    headings: {
        fontFamily: 'Poppins, sans-serif',
    },
    components
})