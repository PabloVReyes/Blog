import { Text, SimpleGrid, UnstyledButton, } from "@mantine/core";
import { IconCheck } from "@tabler/icons-react";
import classes from "./ColorPicker.module.css";
import { useSettingStore } from "../../store";
import { colorMap } from "@/utils";

// Mapeo de nombres a etiquetas legibles (puedes ampliarlo)
export const colorLabels: Record<string, string> = {
    // Colores Estándar
    gray: "Gris Neutro",
    dark: "Negro Carbón",
    red: "Rojo Alerta",
    pink: "Rosa Intenso",
    grape: "Morado Uva",
    violet: "Violeta",
    indigo: "Índigo",
    blue: "Azul Institucional",
    cyan: "Cian",
    teal: "Verde Azulado",
    green: "Verde Éxito",
    lime: "Verde Lima",
    yellow: "Amarillo Preventivo",
    orange: "Naranja",

    // Colores Especiales/Hospitalarios
    darkGreen: "Verde Bosque",
    paleBlue: "Azul Pálido",
    skyBlue: "Azul Cielo",
    brightBlue: "Azul Brillante",
    custom1: "Verde Agua",
    paleRed: "Rojo Suave",
    brown: "Marrón Tierra",
    salmon: "Salmón",
};

export const ColorPicker = () => {
    const { setColor, color: currentColor } = useSettingStore();
    return (
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3, lg: 4}} spacing="sm">
            {Object.entries(colorMap).map(([name, hex]) => {
                const isSelected = currentColor === name;

                return (
                    <UnstyledButton
                        key={name}
                        onClick={() => setColor(name)}
                        className={`${classes.colorOption} ${isSelected ? classes.selected : classes.unselected
                            }`}
                    >
                        {/* Muestra del color (Swatch) */}
                        <div
                            className={classes.swatch}
                            style={{ backgroundColor: hex }}
                        />

                        <Text size="sm" fw={500} style={{ flex: 1 }}>
                            {colorLabels[name] || name.charAt(0).toUpperCase() + name.slice(1)}
                        </Text>

                        {isSelected && (
                            <IconCheck
                                size={18}
                                stroke={3}
                                className={classes.checkIcon}
                            />
                        )}
                    </UnstyledButton>
                );
            })}
        </SimpleGrid>
    );
};