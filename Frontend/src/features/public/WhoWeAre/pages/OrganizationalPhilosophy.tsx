import { Container, Grid, List, Stack, Title } from "@mantine/core"
import { Card } from "../components"
import { IconAward, IconBuildingHospital, IconGolf, IconTarget } from "@tabler/icons-react"

export const OrganizationalPhilosophy = () => {
    return (
        <Container size="lg">
            <Stack gap={"lg"}>
                <Title order={2}>
                    Filosofia Organizacional
                </Title>

                <Grid columns={12}>
                    <Grid.Col span={6}>
                        <Card
                            Icon={IconTarget}
                            title="Misión"
                            color="green"
                            content={"Brindar atención medica gratuita a la población sin seguridad social, centrada en la seguridad del paciente con calidad, sentido humano, promoviendo el autocuidado de su salud, desarrollando investigación y formando profesionales de la salud calificados."}
                        />
                    </Grid.Col>
                    <Grid.Col span={6}>
                        <Card
                            Icon={IconBuildingHospital}
                            title="Visión"
                            color="blue"
                            content={"Ser un hospital de tercer nivel garante del derecho de la salud, reconocido por su modelo de calidad centrado en la seguridad del paciente, consolidado como un centro de educación e investigación de referencia nacional."}
                        />
                    </Grid.Col>
                </Grid>

                <Card
                    Icon={IconAward}
                    title="Política de Calidad"
                    color="violet"
                    content={"El Centro de Alta Especialidad Dr. Rafael Lucio es una institución centrada en la seguridad del paciente a quien le proporciona servicios médicos especializados basados en educación, investigación y procesos de mejora continua."}
                />

                <Card
                    Icon={IconGolf}
                    title="Objetivos de Calidad"
                    color="orange"
                    content={
                        <List>
                            <List.Item>Alinear los procesos y procedimientos del Sistema de Gestión de la Calidad, acorde a los nuevos estándares para la Certificación de Hospitales del Consejo de Salubridad General, para garantizar la seguridad de la atención.</List.Item>
                            <List.Item>Aplicar las Políticas de Seguridad del Paciente.</List.Item>
                            <List.Item>Fortalecer la investigación, formación y capacitación de recursos humanos, paralelamente con los principios fundamentales del Código de Ética.</List.Item>
                            <List.Item>Desarrollar planes educacionales para favorecer la interacción entre el equipo de salud y la comunidad.</List.Item>
                            <List.Item>Gestionar la actualización constante del recurso humano y tecnológico especializado.</List.Item>
                        </List>
                    }
                />
            </Stack >
        </Container>
    )
}