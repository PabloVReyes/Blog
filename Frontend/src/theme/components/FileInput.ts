export const FileInput = {
    defaultProps: {
        radius: "md",
    },

    styles: () => ({
        input: {
            fontSize: '14px',
            backgroundColor: "light-dark(white, oklch(27.8% 0.033 256.848))",
            color: "light-dark(black, white)",
            border: "1px solid",
            borderColor: "light-dark(oklch(92.8% 0.006 264.531), oklch(37.3% 0.034 259.733))",
            padding: "8px 12px",

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
    }),
};
