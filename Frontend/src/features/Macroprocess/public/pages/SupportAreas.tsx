import { IconArrowPointCenterFill, IconBiohazardFill } from "@/ui";
import { ActionIcon, Badge, Button, Fieldset, Group, Loader, SimpleGrid, Stack, Text, useMantineTheme } from "@mantine/core"
import { IconArrowNarrowLeft, IconFileText } from "@tabler/icons-react";
import styles from "./SupportAreas.module.css"
import { colorMap } from "@/utils/colors";
import { useArea, useManualMap } from "../hook";
import { AreaSection, Modal } from "../components";
import { useMediaQuery } from "@mantine/hooks";
import { useMemo, useState } from "react";
import { useDownloadFile } from "@/hooks";
import type { AreaData } from "../../types/areas.types";

const MANUAL_KEYS = {
    sica: "NSICA",
}

const AREA_KEYS = {
    farmacia: "SUP_FARMACIA",
    patologia: "SUP_ANATOMIA_PATOLOGICA",
    archivo: "SUP_ARCHIVO_CLINICO",
    banco_sangre: "SUP_BANCO_SANGRE",
    laboratorio: "SUP_LABORATORIO",
    estomatologia: "SUP_ESTOMATOLOGIA",
    inhaloterapia: "SUP_INHALOTERAPIA",
    manuales: "MAIN_MANUALES_PROCEDIMIENTOS",
    nutricion: "SUP_NUTRICION",
    radiologia: "SUP_RADIOLOGIA",
    insabi: "SUP_ENLACE_INSABI",
    norma: "SUP_MODULO_NOM46",
    uveh: "SUP_UVEH",
    abastecimiento: "SUP_ABASTECIMIENTO",
    juridico: "SUP_ENLACE_JURIDICO",
    financieros: "SUP_RECURSOS_FINANCIEROS",
    fisicos: "SUP_RECURSOS_FISICOS",
    humanos: "SUP_RECURSOS_HUMANOS",
    generales: "SUP_SERVICIOS_GENERALES",
    tecnologias: "SUP_TECNOLOGIAS_INFORMACION",
    rpbi: "MAIN_RPBI",
    emergencia: "MAIN_PLAN_EMERGENCIA",
    nom: 'MAIN_NOM_046'
} as const;

const topSupportAreas = [
    "farmacia",
    "patologia",
    "archivo",
    "banco_sangre",
    "laboratorio",
    "estomatologia",
    "inhaloterapia"
] as const;

const bottomSupportAreas = [
    "nutricion",
    "radiologia",
    "insabi",
    "norma",
    "uveh",
    "abastecimiento",
    "juridico",
    "financieros",
    "fisicos",
    "humanos",
    "generales",
    "tecnologias"
] as const;

interface Props {
    setActiveTab: (area: string) => void;
}

export const SupportAreas = ({ setActiveTab }: Props) => {
    const isMobile = useMediaQuery("(max-width: 768px)");
    const {download} = useDownloadFile()
    const manualTypes = Object.values(MANUAL_KEYS);
    const { manuals, loading: manualsLoading } = useManualMap(manualTypes);

    const [selectedArea, setSelectedArea] = useState<AreaData | null>(null)

    const theme = useMantineTheme()

    const areas = Object.fromEntries(
        Object.entries(AREA_KEYS).map(([key, value]) => [
            key,
            useArea(value)
        ])
    ) as Record<keyof typeof AREA_KEYS, ReturnType<typeof useArea>>;

    const modalColor = useMemo(() => {
        if (!selectedArea) return 'gray'

        switch (selectedArea.area?.id) {
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

    return (
        <Stack>
            <Modal
                opened={Boolean(selectedArea)}
                onClose={() => setSelectedArea(null)}
                area={selectedArea?.area}
                loading={selectedArea?.loading}
                color={modalColor}
            />

            <Fieldset legend="Códigos" style={{ textAlign: "center" }}>
                <Group gap={10} justify="center" wrap="wrap">
                    <Badge variant="filled" color="gray.5">(MO) Manual de Organización</Badge>
                    <Badge variant="filled" color="red">(MP) Manual de Procedimientos</Badge>
                    <Badge variant="filled" color="blue">(DxSit) Diagnóstico Situacional</Badge>
                    <Badge variant="filled" color="yellow">(PT) Plan de Trabajo</Badge>
                </Group>
            </Fieldset>

            <Fieldset style={{ textAlign: "center" }}>
                <Stack>
                    <SimpleGrid
                        cols={{ xs: 1, sm: 2, md: 4, lg: 7 }}
                        spacing={10}
                    >
                        {topSupportAreas.map(key => (
                            <AreaSection
                                key={key}
                                area={areas[key]}
                            />
                        ))}

                        <Group
                            gap={10}
                            wrap="nowrap"
                            className={styles.specialBlock}
                        >
                            <AreaSection
                                area={areas.manuales}
                                showMain={false}
                                showExtras
                                numberColums={1}
                            />

                            <Stack gap={3}>
                                <ActionIcon size={50} color="red" w={"100%"} onClick={() => setSelectedArea(areas.rpbi)}>
                                    <IconBiohazardFill size={40} color="white" />
                                </ActionIcon>
                                <ActionIcon size={50} color="green" w={"100%"} onClick={() => setSelectedArea(areas.emergencia)}>
                                    <IconArrowPointCenterFill size={40} color="white" />
                                </ActionIcon>
                                <ActionIcon size={50} color="#7D0256" w={"100%"} onClick={() => setSelectedArea(areas.nom)}>
                                    <Text size="xl" fw={700}>046</Text>
                                </ActionIcon>
                            </Stack>
                        </Group>

                        {bottomSupportAreas.map(key => (
                            <AreaSection
                                key={key}
                                area={areas[key]}
                            />
                        ))}
                    </SimpleGrid>

                    {isMobile ? (
                        <Stack align="center" gap={10}>
                            <Fieldset
                                legend="Normativa SICA"
                                style={{ textAlign: "center", width: "100%", alignItems: "center" }}
                            >
                                <ActionIcon
                                    size={56}
                                    variant="light"
                                    style={{
                                        '--icon-rgb': `${colorMap[theme.primaryColor]}`
                                    } as React.CSSProperties}
                                >
                                    <IconFileText />
                                </ActionIcon>
                            </Fieldset>

                            <Button
                                className={styles.group}
                                size="compact-xs"
                                variant="subtle"
                                leftSection={<IconArrowNarrowLeft size={20} className={styles.arrow} />}
                                onClick={() => setActiveTab("mainareas")}
                            >
                                Áreas Principales
                            </Button>
                        </Stack>
                    ) : (
                        <Group justify="space-between" align="center">
                            <Button
                                className={styles.group}
                                size="compact-xs"
                                variant="subtle"
                                leftSection={<IconArrowNarrowLeft size={20} className={styles.arrow} />}
                                onClick={() => setActiveTab("mainareas")}
                            >
                                Áreas Principales
                            </Button>

                            {manualsLoading ? (
                                <Loader size="sm" />
                            ) : (
                                <Fieldset
                                    legend={manuals[MANUAL_KEYS.sica].manualType.name}
                                    style={{ textAlign: "center", alignItems: "center" }}
                                >
                                    <ActionIcon
                                        disabled={!manuals[MANUAL_KEYS.sica].storedName}
                                        size={56}
                                        variant="light"
                                        onClick={() => manuals[MANUAL_KEYS.sica] && download(manuals[MANUAL_KEYS.sica].fileId)}
                                        style={{
                                            '--icon-rgb': `${colorMap[theme.primaryColor]}`
                                        } as React.CSSProperties}
                                    >
                                        <IconFileText />
                                    </ActionIcon>
                                </Fieldset>
                            )}
                        </Group>
                    )}
                </Stack>
            </Fieldset >
        </Stack >
    )
}