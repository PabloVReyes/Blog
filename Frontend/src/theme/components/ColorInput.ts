export const ColorInput = {
    styles: () => ({
        input: {
            backgroundColor: "light-dark(white, oklch(27.8% 0.033 256.848))",
            color: "light-dark(black, white)",
            borderColor: "light-dark(oklch(92.8% 0.006 264.531), oklch(37.3% 0.034 259.733))",
            transition: "border-color 0.15s ease",

            "&:focus": {
                borderColor: "light-dark(oklch(60% 0.12 260), oklch(70% 0.12 260))",
            },

            "&::placeholder": {
                color: "light-dark(#6b7280, #9ca3af)",
            },
        },

        error: {
            color: "red",
        },

        swatch: {
            borderColor: "light-dark(oklch(92.8% 0.006 264.531), oklch(37.3% 0.034 259.733))",
            backgroundColor: "light-dark(white, oklch(27.8% 0.033 256.848))",
        },
    }),
};
