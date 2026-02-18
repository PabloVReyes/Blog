import { Button, Card, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import * as TablerIcons from "@tabler/icons-react";
import { downloadSystem } from "../../api";
import styles from './System.module.css'
import { useNavigate } from "react-router-dom";

export const System = ({ id, icon, color, name, acronym, description, url, type }: any) => {
    const navigate = useNavigate()

    const Icon =
        icon &&
        (TablerIcons as any)[icon];

    const download = async (id: string) => {
        try {
            const response = await downloadSystem(id)

            const blob = new Blob([response.data], {
                type: "application/pdf",
            });

            const url = window.URL.createObjectURL(blob);

            window.open(url, "_blank");

            // Opcional: liberar memoria después de un tiempo
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
            }, 1000);


        } catch (error) {
            console.error("Error al descargar archivo", error);
        }
    };

    const handleNavigate = () => {
        if (type === "file") {
            download(id)
        } else {
            if (!url) return;

            // externa
            if (url.startsWith("http")) {
                window.open(url, "_blank"); // o window.location.href = url;
            } else {
                // interna SPA
                const newUrl = `/sistemas-de-consulta${url}`
                navigate(newUrl);
            }
        }
    };

    return (
        <Card
            h={'100%'}
            p={"lg"}
            onClick={handleNavigate}
            style={{
                cursor: "pointer",
                position: "relative"
            }}
            className={styles.group}
        >
            <Stack gap={"xs"} h={"100%"}>
                <ThemeIcon
                    size={56}
                    color={color}
                    variant="light"
                    className={`${styles.iconWrapper}`}
                    style={{
                        '--icon-rgb': color || "#40c057" // fallback green
                    } as React.CSSProperties}
                >
                    <Icon size={28} />
                </ThemeIcon>

                <Title order={4} className={styles.itemTitle}>
                    {acronym &&
                        `${acronym} - `
                    }
                    {name}
                </Title>

                {description && (
                    <Text size="sm">
                        {description}
                    </Text>
                )}

                <Button
                    mt={"auto"}
                    variant="subtle"
                    px={0}
                    className={styles.action}
                    rightSection={
                        <TablerIcons.IconArrowNarrowRight
                            size={20}
                            className={styles.arrow}
                        />
                    }
                >
                    Acceder al sistema
                </Button>
            </Stack>
        </Card>
    )
}