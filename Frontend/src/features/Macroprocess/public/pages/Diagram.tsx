import { Box, Button, Container, Loader, Stack, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useManualMap } from "../hook";
import { ManualButton } from "../components";
import { useDownloadFile } from "@/hooks";

interface Props {
    setActiveTab: (area: string) => void;
}

const MANUAL_KEYS = {
    vigilancia: "VEH",
    seguridadPaciente: "SP",
    consultaExtena: "ACE",
    urgencias: "AU",
    hospitalizacion: "AH",
    medico: "AMQ",
    auxiliares: "AAD",
    formacion: "FRHI",
    soporte: "SA"
}

export const Diagram = ({ setActiveTab }: Props) => {
    const manualTypes = Object.values(MANUAL_KEYS);
    const { manuals, loading } = useManualMap(manualTypes);
    const isMobile = useMediaQuery("(max-width: 1240px)");
    const { download } = useDownloadFile()

    if (loading) {
        return (
            <Container style={{ textAlign: "center" }}>
                <Loader />
            </Container>
        );
    }

    return (
        <Stack>
            <ManualButton
                manual={manuals[MANUAL_KEYS.vigilancia]}
                size={isMobile ? "md" : "xl"}
                onClick={() => download(manuals[MANUAL_KEYS.vigilancia].fileId)}
            />
            <Box
                style={{
                    display: "grid",
                    gridTemplateColumns: isMobile
                        ? "minmax(0, 1fr)"
                        : "minmax(0,1fr) minmax(0,3fr) minmax(0,1fr)", // ← CLAVE
                    gap: 5,
                    width: "100%",
                    alignItems: "stretch",
                }}
            >
                <ManualButton
                    manual={manuals[MANUAL_KEYS.seguridadPaciente]}
                    size={isMobile ? "md" : "xl"}
                    rotate={isMobile ? 0 : -90}
                    onClick={() => download(manuals[MANUAL_KEYS.seguridadPaciente].fileId)}
                />

                {/* Centro */}
                <Stack gap={5} w="100%" style={{ minWidth: 0 }}>
                    {[
                        "consultaExtena",
                        "urgencias",
                        "hospitalizacion",
                        "medico",
                        "auxiliares",
                    ].map((key) => (
                        <ManualButton
                            key={key}
                            manual={manuals[MANUAL_KEYS[key as keyof typeof MANUAL_KEYS]]}
                            size={isMobile ? "md" : "xl"}
                            onClick={() =>
                                download(manuals[MANUAL_KEYS[key as keyof typeof MANUAL_KEYS]].fileId)
                            }
                        />
                    ))}
                </Stack>


                {/* Derecho */}
                <ManualButton
                    manual={manuals[MANUAL_KEYS.formacion]}
                    size={isMobile ? "md" : "xl"}
                    rotate={isMobile ? 0 : 90}
                    onClick={() => download(manuals[MANUAL_KEYS.formacion].fileId)}
                />

            </Box>

            <ManualButton
                manual={manuals[MANUAL_KEYS.soporte]}
                size={isMobile ? "md" : "xl"}
                onClick={() => download(manuals[MANUAL_KEYS.soporte].fileId)}
            />

            <Button
                size={isMobile ? "md" : "xl"}
                color="orange.2"
                style={{
                    minWidth: 0,
                    height: "100%",
                }}
            >
                <Text
                    p={10}
                    fw={700}
                    size={isMobile ? "md" : "xl"}
                    ta="center"
                    style={{
                        whiteSpace: "normal",
                        overflowWrap: "anywhere",
                    }}
                    onClick={() => setActiveTab("mainareas")}
                >
                    Acceso al Sistema Electrónico Documental del CAE
                </Text>
            </Button>
        </Stack>
    );
};
