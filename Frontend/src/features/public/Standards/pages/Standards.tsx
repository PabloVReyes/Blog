import { Card, Container, Stack, Text, Title } from "@mantine/core"
import { StandardsCard } from "../components"

export const Standards = () => {
    return (
        <Container size="lg">
            <Stack gap={"lg"}>
                <Title order={2}>
                    Normas Oficiales Mexicanas
                </Title>

                <Text c="dimmed">
                    Las Normas Oficiales Mexicanas (NOM) son regulaciones técnicas de observancia obligatoria expedidas por las dependencias competentes, que tienen como finalidad establecer las características que deben reunir los procesos o servicios cuando estos puedan constituir un riesgo para la seguridad de las personas o dañar la salud humana; así como aquellas relativas a terminología y las que se refieran a su cumplimiento y aplicación.
                    Las NOM en materia de Prevención y Promoción de la Salud, una vez aprobadas por el Comité Consultivo Nacional de Normalización de Prevención y Control de Enfermedades (CCNNPCE) son expedidas y publicadas en el Diario Oficial de la Federación y, por tratarse de materia sanitaria, entran en vigor al día siguiente de su publicación.
                </Text>

                <StandardsCard/>
                
                <Card
                    withBorder
                    radius={15}
                    p="lg"
                    style={{ backgroundColor: "#ecfdf5", borderColor: "#a4f4cf" }}
                >
                    <Text fw={600} fz="lg" mb="sm" color="#004f3b">
                        Actualizaciones y Modificaciones
                    </Text>
                    <Text fz="sm" color="#004f3b">
                        Las NOM deben ser revisadas cada 5 años a partir de su entrada en vigor. El CCNNPCE deberá de analizar y, en su caso, realizar un estudio de cada NOM, cuando su periodo venza en el transcurso del año inmediato anterior y, como conclusión de dicha revisión y/o estudio podrá decidir la modificación, cancelación o ratificación de las mismas.
                    </Text>
                </Card>
            </Stack>
        </Container>
    )
}