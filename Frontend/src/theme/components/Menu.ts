export const Menu = {
    defaultProps: {
        shadow: 'sm',
        radius: 15,
        withArrow: true,
    },
    styles: () => ({
        dropdown: {
            backgroundColor: "light-dark(white, oklch(27.8% 0.033 256.848))",
            borderColor: "light-dark(oklch(92.8% 0.006 264.531), oklch(37.3% 0.034 259.733))",
            borderWidth: 1,
            borderStyle: "solid",
        },

        item: {
            borderRadius: 10,
        },

        arrow: {
            backgroundColor: "light-dark(white, oklch(27.8% 0.033 256.848))",
            borderColor: "light-dark(oklch(92.8% 0.006 264.531), oklch(37.3% 0.034 259.733))",
        }
    }),
};