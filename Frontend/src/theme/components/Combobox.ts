export const Combobox = {
    defaultProps: {
        radius: "md",
    },

    styles: (theme: any) => ({
        input: {
            backgroundColor: "light-dark(white, oklch(27.8% 0.033 256.848))",
            color: "light-dark(black, white)",
            border: "1px solid",
            borderColor:
                "light-dark(oklch(92.8% 0.006 264.531), oklch(37.3% 0.034 259.733))",
            transition: "all .15s ease",

            "&:focus": {
                borderColor: theme.colors[theme.primaryColor][6],
            },
        },

        dropdown: {
            backgroundColor: "light-dark(white, oklch(27.8% 0.033 256.848))",
            border: "1px solid",
            borderColor:
                "light-dark(oklch(92.8% 0.006 264.531), oklch(37.3% 0.034 259.733))",
        },

        /* 🔥 ESTA ES LA CLAVE */
        option: {
            color: "light-dark(black, white)",

            "&:hover": {
                backgroundColor: "var(--mantine-primary-color-filled)",
                color: "var(--mantine-primary-color-contrast)",
            },

            "&[data-combobox-selected]": {
                backgroundColor: "var(--mantine-primary-color-filled)",
                color: "var(--mantine-primary-color-contrast)",
            },

            "&[data-combobox-active]": {
                backgroundColor: "var(--mantine-primary-color-filled)",
                color: "var(--mantine-primary-color-contrast)",
            },
        },
    }),
};
