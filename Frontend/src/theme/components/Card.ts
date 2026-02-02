export const Card = {
    defaultProps: {
        withBorder: true,
        shadow: 'sm',
        radius: 15,
    },
    styles: () => ({
        root: {
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: "light-dark(white, oklch(27.8% 0.033 256.848))",
            borderColor: 'light-dark(oklch(92.8% 0.006 264.531), oklch(37.3% 0.034 259.733))'
        },
    }),
}