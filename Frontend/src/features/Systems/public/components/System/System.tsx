import { Button, Card, Stack, Text, ThemeIcon, Title } from "@mantine/core";
import * as TablerIcons from "@tabler/icons-react";
import styles from './System.module.css'
import { useNavigate } from "react-router-dom";
import { getTablerIcon } from "@/helpers";
import type { SystemData } from "@/features/Systems/types/systems.types";
import { useDownloadFile } from "@/hooks";

export const System = ({ icon, color, name, acronym, description, url, type, file }: SystemData) => {
    const navigate = useNavigate()
    const { view } = useDownloadFile()

    const Icon = getTablerIcon(icon)

    const handleNavigate = () => {
        if (type === "file") {
            view(file.id)
        } else {
            if (!url) return;
            if (url.startsWith("http")) {
                window.open(url, "_blank"); // o window.location.href = url;
            } else {
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