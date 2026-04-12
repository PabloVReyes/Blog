import { Box, Card, Group, SimpleGrid, Text, useMantineTheme } from "@mantine/core";
import {
    IconArrowNarrowRight,
    IconChartBar,
    IconKey,
    IconSettings,
    IconShield,
    IconUserCog,
    IconUsers
} from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { Alert, Container } from "@/components";

// Importación del CSS Module
import classes from "./Settings.module.css";

const modules = [
    { id: 1, name: "Gestión de Usuarios", description: "Crear, editar y administrar cuentas", icon: IconUsers, color: "blue", url: "/administracion/configuraciones/usuarios", stats: "45 usuarios" },
    { id: 2, name: "Gestión de Roles", description: "Jerarquías del personal", icon: IconShield, color: "emerald", url: "/administracion/configuraciones/roles", stats: "8 roles" },
    { id: 3, name: "Gestión de Permisos", description: "Configurar accesos", icon: IconKey, color: "purple", url: "/administracion/configuraciones/permisos", stats: "24 permisos" },
    { id: 4, name: "Auditoría", description: "Registro de actividades", icon: IconChartBar, color: "orange", url: "#", stats: "1,250 eventos" },
    { id: 5, name: "Configuración General", description: "Parámetros del sistema", icon: IconSettings, color: "gray", url: "/administracion/configuraciones/general", stats: "12 activos" },
    { id: 6, name: "Perfiles", description: "Plantillas predefinidas", icon: IconUserCog, color: "cyan", url: "#", stats: "5 perfiles" },
];

export const Settings = () => {
    const theme = useMantineTheme()

    return (
        <Container title="Panel de configuración" description="Gestión completa del sistema">
            <Alert
                color="yellow"
                title={
                    <Group gap="xs" mb="sm">
                        <IconShield size={20} />
                        <Text fw={600} fz="lg">Acceso Restringido</Text>
                    </Group>
                }
                content="Este módulo es exclusivo para Administradores. Las acciones quedan registradas."
            />

            <SimpleGrid cols={{ base: 1, md: 2, lg: 3 }} spacing="lg" mb="xl">
                {modules.map((module) => (
                    <Card
                        key={module.id}
                        component={Link}
                        to={module.url}
                        radius="lg"
                        withBorder
                        className={classes.card} // Uso de CSS Module
                    >
                        <Card.Section
                            withBorder={false}
                            p={0}
                        >
                            <Box className={`${classes.headerBox} ${classes[`bg_${module.color}`]}`}>
                                <div className={classes.gradientOverlay} />

                                <module.icon size={64} color="white" style={{ zIndex: 1, opacity: 0.9 }} />

                                <div className={classes.patternContainer}>
                                    <module.icon className={classes.patternSquare} />
                                </div>
                            </Box>
                        </Card.Section>

                        <Box mt="md" mb="xl">
                            <Text fw={700} size="lg" className="mantine-visible-from-light">
                                {module.name}
                            </Text>
                            <Text size="sm" c="dimmed" mt="xs" lineClamp={2}>
                                {module.description}
                            </Text>
                        </Box>

                        <Card.Section inheritPadding py="xs" withBorder={false}>
                            <Group justify="flex-end">
                                <Group gap={4} c={theme.primaryColor}>
                                    <Text size="sm" fw={600}>Acceder</Text>
                                    <IconArrowNarrowRight size={18} className={classes.arrowIcon} />
                                </Group>
                            </Group>
                        </Card.Section>
                    </Card>
                ))}
            </SimpleGrid>
        </Container>
    );
};