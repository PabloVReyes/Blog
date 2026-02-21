import { useMantineTheme, getContrastColor } from "@mantine/core";

interface HighlightProps {
    text: string;
    query: string;
}

export const Highlight: React.FC<HighlightProps> = ({ text, query }) => {
    const theme = useMantineTheme();
    if (!query) return <>{text}</>;

    // Función para normalizar y quitar acentos
    const normalizeString = (str: string) =>
        str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

    const normalizedQuery = normalizeString(query);

    // Creamos regex insensible a mayúsculas y global sobre texto normalizado
    const regex = new RegExp(`(${normalizedQuery})`, "gi");

    // Dividimos el texto original, pero usando indices de coincidencia de la versión normalizada
    const parts: { text: string; highlight: boolean }[] = [];

    let lastIndex = 0;
    const normalizedText = normalizeString(text);

    // Recorremos todas las coincidencias en el texto normalizado
    let match;
    while ((match = regex.exec(normalizedText)) !== null) {
        const start = match.index;
        const end = start + match[0].length;

        if (lastIndex < start) {
            parts.push({ text: text.slice(lastIndex, start), highlight: false });
        }
        parts.push({ text: text.slice(start, end), highlight: true });

        lastIndex = end;
    }

    // Agregamos el resto del texto
    if (lastIndex < text.length) {
        parts.push({ text: text.slice(lastIndex), highlight: false });
    }

    const primaryColor = theme.colors[theme.primaryColor][4];
    const contrastColor = getContrastColor({ color: primaryColor, theme });

    return (
        <>
            {parts.map((part, i) =>
                part.highlight ? (
                    <span
                        key={i}
                        style={{
                            backgroundColor: primaryColor,
                            color: contrastColor,
                            fontWeight: 500,
                            borderRadius: 2,
                            padding: "0 2px",
                        }}
                    >
                        {part.text}
                    </span>
                ) : (
                    part.text
                )
            )}
        </>
    );
};
