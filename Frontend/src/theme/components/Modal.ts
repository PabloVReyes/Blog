export const Modal = {
    defaultProps: {
        withBorder: true,
        shadow: "sm",
    },

    styles: () => ({
        content: {
            backgroundColor: "light-dark(white, oklch(27.8% 0.033 256.848))",
            borderColor:
                "light-dark(oklch(92.8% 0.006 264.531), oklch(37.3% 0.034 259.733))",
        },

        header: {
            backgroundColor: "light-dark(white, oklch(27.8% 0.033 256.848))",
            borderBottom:
                "1px solid light-dark(oklch(92.8% 0.006 264.531), oklch(37.3% 0.034 259.733))",
        },
    }),
};
