import { createTheme } from "@mantine/core";
import { components } from "./components";

export const mantineTheme = (primaryColor: string = "blue") => createTheme({
    fontFamily: 'Inter, sans-serif',
    primaryColor,
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