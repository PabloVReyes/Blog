import { IconArrowPointCenterFill, IconBiohazardFill } from "@/ui";
import { ActionIcon, Badge, Button, Fieldset, Grid, Group, SimpleGrid, Stack, Text } from "@mantine/core";
import { IconArrowNarrowRight } from "@tabler/icons-react";
import styles from "./MainAreas.module.css"
import { useArea } from "../hook";
import { AreaSection, Modal } from "../components";
import { useMemo, useState } from "react";


interface Props {
    setActiveTab: (area: string) => void;
}

const AREA_KEYS = {
    direccion: "MAIN_ALTA_DIRECCION",
    trabajo_social: "MAIN_TRABAJO_SOCIAL",
    consulta_externa: "MAIN_CONSULTA_EXTERNA",
    urgencias: "MAIN_URGENCIAS",
    pediatria: "MAIN_PEDIATRIA",
    cirugia: "MAIN_CIRUGIA",
    ginecologia: "MAIN_GINECOLOGIA",
    traumatologia: "MAIN_TRAUMATOLOGIA",
    medicina_interna: "MAIN_MEDICINA_INTERNA",
    nefrologia: "MAIN_NEFROLOGIA",
    cardiologia: "MAIN_CARDIOLOGIA",
    ucia: "MAIN_UCIA",
    ucin: "MAIN_UCIN",
    area_anexa: "MAIN_AREA_ANEXA",
    anestesiologia: "MAIN_ANESTESIOLOGIA",
    investigacion: "MAIN_ENSENANZA_INVESTIGACION",
    enfermeria: "MAIN_ENFERMERIA",
    capasits: "MAIN_CAPASITS",
    manuales: "MAIN_MANUALES_PROCEDIMIENTOS",
    rpbi: "MAIN_RPBI",
    emergencia: "MAIN_PLAN_EMERGENCIA",
    nom: 'MAIN_NOM_046'
} as const;

const hospitalAreas = [
    "pediatria",
    "cirugia",
    "ginecologia",
    "traumatologia",
    "medicina_interna",
    "nefrologia",
    "cardiologia"
] as const;

const bottomSections = [
    { key: "capasits", showMain: false, showExtras: true },
    { key: "investigacion" },
    { key: "enfermeria", showExtras: true },
    { key: "manuales", numberColums: 1, showMain: false, showExtras: true }
] as const;

type SelectedArea = {
    area: any
    loading: boolean
}

export const MainAreas = ({ setActiveTab }: Props) => {
    const [selectedArea, setSelectedArea] = useState<SelectedArea | null>(null)

    const modalColor = useMemo(() => {
        if (!selectedArea) return 'gray'

        switch (selectedArea.area.id) {
            case 'MAIN_RPBI':
                return 'red'
            case 'MAIN_PLAN_EMERGENCIA':
                return 'green'
            case 'MAIN_NOM_046':
                return '#7D0256'
            default:
                return 'blue'
        }
    }, [selectedArea])

    const areas = Object.fromEntries(
        Object.entries(AREA_KEYS).map(([key, value]) => [
            key,
            useArea(value)
        ])
    ) as Record<keyof typeof AREA_KEYS, ReturnType<typeof useArea>>;

    return (

        <Stack gap={20} w="100%">
            <Modal
                opened={Boolean(selectedArea)}
                onClose={() => setSelectedArea(null)}
                area={selectedArea?.area}
                loading={selectedArea?.loading}
                color={modalColor}
            />
            {/* Codigos */}
            <Fieldset legend="Códigos" style={{ textAlign: "center" }}>
                <Group gap={10} justify="center" wrap="wrap">
                    <Badge autoContrast color="gray.5">(MO) Manual de Organización</Badge>
                    <Badge autoContrast color="red">(MP) Manual de Procedimientos</Badge>
                    <Badge autoContrast color="blue">(DxSit) Diagnóstico Situacional</Badge>
                    <Badge autoContrast color="yellow">(PT) Plan de Trabajo</Badge>
                </Group>
            </Fieldset>

            <AreaSection
                area={areas.direccion}
                showExtras
            />

            <Grid gutter="md" align="stretch">
                <Grid.Col span={{ xs: 12, md: 2 }}>
                    <Fieldset legend="Atención Ambolatorio y Prehospitalaria" style={{ height: '100%', textAlign: "center" }}>
                        <Stack h="100%" style={{ justifyContent: "center" }}>
                            <AreaSection
                                area={areas.consulta_externa}
                            />

                            <AreaSection
                                area={areas.urgencias}
                            />
                        </Stack>
                    </Fieldset>
                </Grid.Col>

                <Grid.Col span={{ xs: 12, md: 8.5 }}>
                    <Fieldset legend="Atención Hospitalaria" style={{ height: '100%', textAlign: "center" }}>
                        <Grid>
                            <Grid.Col span={{ xs: 12, md: 9 }}>
                                <Stack gap={10}>
                                    <SimpleGrid
                                        cols={{ xs: 1, sm: 2, md: 3 }}
                                        spacing={10}
                                    >
                                        {hospitalAreas.map(key => (
                                            <AreaSection
                                                key={key}
                                                area={areas[key]}
                                            />
                                        ))}
                                    </SimpleGrid>
                                    <Fieldset legend="Cuidados Intensivos">
                                        <Group gap={10} justify="center">
                                            <AreaSection
                                                area={areas.ucia}
                                            />

                                            <AreaSection
                                                area={areas.ucin}
                                            />
                                        </Group>
                                    </Fieldset>
                                </Stack>
                            </Grid.Col>
                            <Grid.Col span={{ xs: 12, md: 3 }} >
                                <Stack gap={10} style={{ justifyContent: "center", height: "100%" }}>
                                    <AreaSection
                                        area={areas.area_anexa}
                                    />
                                    <AreaSection
                                        area={areas.anestesiologia}
                                    />
                                </Stack>
                            </Grid.Col>
                        </Grid>
                    </Fieldset>
                </Grid.Col>

                <Grid.Col span={{ xs: 12, md: 1.5 }}>
                    <Stack style={{ height: "100%", alignItems: "center" }}>
                        <AreaSection
                            area={areas.trabajo_social}
                            fullWidth
                        />
                        <ActionIcon size={100} color="#7D0256" w={"100%"} onClick={() => setSelectedArea(areas.nom)}>
                            <Stack gap={0} style={{ textAlign: "center" }}>
                                <Text size="xl" fw={700}>CÓDIGO</Text>
                                <Text size="xl" fw={700}>046</Text>
                            </Stack>
                        </ActionIcon>
                    </Stack>
                </Grid.Col>
            </Grid>

            {/* CAPASITS y otros */}
            <Fieldset style={{ textAlign: "center" }}>
                <SimpleGrid cols={{ md: 6, sm: 2, xs: 1 }} spacing={10} style={{ textAlign: "center", alignItems: "center", justifyItems: "center", height: "100%" }}>
                    {bottomSections.map(({ key, ...props }) => (
                        <AreaSection
                            fullWidth
                            key={key}
                            area={areas[key]}
                            {...props}
                        />
                    ))}

                    <Stack gap={2}>
                        <ActionIcon size={60} color="red" onClick={() => setSelectedArea(areas.rpbi)}>
                            <IconBiohazardFill size={70} color="white" />
                        </ActionIcon>
                        <ActionIcon size={60} color="green" onClick={() => setSelectedArea(areas.emergencia)}>
                            <IconArrowPointCenterFill size={70} color="white" />
                        </ActionIcon>
                    </Stack>

                    <Button
                        size="compact-xs"
                        variant="subtle"
                        className={styles.group}
                        rightSection={<IconArrowNarrowRight size={20} className={styles.arrow} />}
                        onClick={() => setActiveTab("supportareas")}
                    >
                        Áreas de Apoyo
                    </Button>
                </SimpleGrid>
            </Fieldset>
        </Stack >
    )
};
