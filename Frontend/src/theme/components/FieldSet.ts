export const Fieldset = {
    defaultProps: {
        radius: 15,        // igual que Card
    },

    vars: () => ({
        root: {
            /* Fondo igual que Card */
            "--fieldset-bg": "light-dark(white, oklch(27.8% 0.033 256.848))",

            /* Borde igual que Card */
            "--fieldset-border-color": "light-dark(oklch(92.8% 0.006 264.531), oklch(37.3% 0.034 259.733))",

            /* Radio igual que Card */
            "--fieldset-radius": "15px",
        },
    }),

    styles: () => ({
        root: {
            display: "flex",
            flexDirection: "column",
            padding: "1rem",          // opcional, ajusta como Card
            borderWidth: 1,
            borderStyle: "solid",
            backgroundColor: "var(--fieldset-bg)",
            borderColor: "var(--fieldset-border-color)",
            borderRadius: "var(--fieldset-radius)",
            transition: "all 0.15s ease",
        },

        legend: {
            fontWeight: 600,
            color: "light-dark(black, white)",  // similar a Card texto
        },
    }),
};
