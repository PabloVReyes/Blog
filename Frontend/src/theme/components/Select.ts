export const Select = {
    defaultProps: {
        radius: "md",
        searchable: true,
        nothingFoundMessage: "Sin resultados",
    },

    styles: () => ({
        input: {
            backgroundColor: "light-dark(white, oklch(27.8% 0.033 256.848))",
            color: "light-dark(black, white)",

            borderColor:
                "light-dark(oklch(92.8% 0.006 264.531), oklch(37.3% 0.034 259.733))",

            "&:focus": {
                borderColor:
                    "light-dark(oklch(60% 0.12 260), oklch(70% 0.12 260))",
            },

            "&::placeholder": {
                color: "light-dark(#6b7280, #9ca3af)",
            },
        },

        dropdown: {
            backgroundColor: "light-dark(white, oklch(27.8% 0.033 256.848))",
            borderColor:
                "light-dark(oklch(92.8% 0.006 264.531), oklch(37.3% 0.034 259.733))",
        },

        option: {
            color: "light-dark(black, white)",

            "&[data-hovered]": {
                backgroundColor:
                    "light-dark(oklch(95% 0.01 260), oklch(35% 0.04 260))",
            },

            "&[data-selected]": {
                backgroundColor:
                    "light-dark(oklch(90% 0.06 260), oklch(45% 0.08 260))",
                color: "light-dark(black, white)",
            },
        },
    }),
};
