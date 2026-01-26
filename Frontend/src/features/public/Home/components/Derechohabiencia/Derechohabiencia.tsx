import { Button, Card, Stack, Text, ThemeIcon, Title } from "@mantine/core"
import styles from "./Derechohabiencia.module.css"
import { IconExternalLink, IconSearch } from "@tabler/icons-react"

export const Derechohabiencia = () => {
    return (
        <Card padding={"lg"} h={"100%"}>
            <Stack h={"100%"}>
                <div className={styles.item}>
                    <ThemeIcon variant="light" color="blue" className={styles.itemIcon} size={45} radius="md">
                        <IconSearch size={40} />
                    </ThemeIcon>

                    <div>
                        <Title order={4} className={styles.itemTitle}>
                            Consulta Derechohabiencia
                        </Title>
                    </div>
                </div>

                <Text size="sm">
                    Verifica el estatus de afiliación
                </Text>

                <Stack gap={"xs"} mt={"auto"}>
                    <Button
                        variant="light"
                        color="gray"
                        justify="space-between"
                        rightSection={
                            <IconExternalLink
                                size={16}
                            />
                        }
                        component="a"
                        href="https://www.imss.gob.mx/constancia-no-derechohabiencia"
                        target="_blank"
                    >
                        IMSS Digital
                    </Button>

                    <Button
                        variant="light"
                        color="gray"
                        justify="space-between"
                        rightSection={
                            <IconExternalLink
                                size={16}
                            />
                        }
                        component="a"
                        href="https://oficinavirtual.issste.gob.mx/Servicios/Acreditaci%C3%B3n-de-no-Afiliaci%C3%B3n"
                        target="_blank"
                    >
                        ISSSTE
                    </Button>

                    <Button
                        variant="light"
                        color="gray"
                        justify="space-between"
                        rightSection={
                            <IconExternalLink
                                size={16}
                            />
                        }
                        component="a"
                        href="https://www.gob.mx/curp/"
                        target="_blank"
                    >
                        CURP
                    </Button>
                </Stack>
            </Stack>
        </Card>
    )
}