import { Alert, Container } from "@/components";
import { Group, Stack, Tabs, Text } from "@mantine/core";
import styles from "./Macroprocess.module.css";
import { Diagram } from "./Diagram";
import { MainAreas } from "./MainAreas";
import { useState } from "react";
import { IconInfoCircle } from "@tabler/icons-react";
import { SupportAreas } from "./SupportAreas";

export const Macroprocess = () => {
    const [activeTab, setActiveTab] = useState<string | null>("macroprocess")

    return (
        <Container
            title="Macroproceso Institucional"
            description="Mapa interactivo completo - Click en cualquier elemento para ver detalles"
        >
            <Tabs radius={"xs"} value={activeTab} onChange={setActiveTab}>
                <Stack>
                    <Tabs.List grow>
                        <Tabs.Tab value="macroprocess" className={styles.tab}>
                            Macroproceso
                        </Tabs.Tab>
                        <Tabs.Tab value="mainareas" className={styles.tab}>
                            Áreas principales
                        </Tabs.Tab>
                        <Tabs.Tab value="supportareas" className={styles.tab}>
                            Áreas de apoyo
                        </Tabs.Tab>
                    </Tabs.List>

                    <Tabs.Panel value="macroprocess">
                        <Diagram
                            setActiveTab={setActiveTab}
                        />
                    </Tabs.Panel>

                    <Tabs.Panel value="mainareas">
                        <MainAreas
                            setActiveTab={setActiveTab}
                        />
                    </Tabs.Panel>

                    <Tabs.Panel value="supportareas">
                        <SupportAreas
                            setActiveTab={setActiveTab}
                        />
                    </Tabs.Panel>
                </Stack>
            </Tabs>

            <Alert
                color="blue"
                title={
                    <Group align="center" gap="xs" mb="sm">
                        <IconInfoCircle />
                        <Text fw={600} fz="lg">
                            Mapa Interactivo Completo
                        </Text>
                    </Group>
                }
                content="Este sistema contiene 180 elementos interactivos del macroproceso hospitalario. Haz click en cualquier botón para ver el archivo PDF de cada área. Utiliza las pestañas superiores para navegar entre las diferentes vistas del sistema."
            />
        </Container >
    );
};
