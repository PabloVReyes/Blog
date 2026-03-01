import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fecthArea } from "../api"
import { Notify } from "@/ui"
import { Card, Center, Group, Loader, Stack, Tabs, Text, useMantineTheme } from "@mantine/core"
import { Container } from "@/components"
import classes from "./Areas.module.css"
import { getCicloColor } from "@/utils"
import { Download } from "../components"

interface Data {
    id: number;
    name: string;
    slug: string;
    icon: string;
    color: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    sections: Section[];
}


export interface Section {
    id: number;
    name: string;
    order: null;
    isActive: boolean;
    areaId?: number;
    createdAt: Date;
    updatedAt: Date;
    categories?: Section[];
    sectionId?: number;
    files?: File[];
}

export interface File {
    id: number;
    name: string;
    description: null;
    fileName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
    type: string;
    isNew: boolean;
    isActive: boolean;
    order: null;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
}

export const Area = () => {
    const { slug } = useParams<{ slug: string }>()
    const [data, setData] = useState<Data>()
    const [loading, setLoading] = useState<boolean>(false);
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const theme = useMantineTheme()

    useEffect(() => {
        if (data?.sections?.length) {
            setActiveTab(data.sections[0].id.toString()); // siempre seleccionar la primera
        }
    }, [data]);


    const handleFetch = async () => {
        try {
            setLoading(true)
            const response = await fecthArea(slug);
            setData(response);
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al obtener datos",
                message: error.message || "Error desconocido",
            });
        }
        finally {
            setLoading(false)
        }
    };

    useEffect(() => {
        handleFetch()
    }, [slug])

    if (loading) {
        return (
            <Center h={"100%"}>
                <Loader />
            </Center>
        )
    }

    return (
        <Container
            title={data?.name}
        >
            {data?.sections.length === 0 ?
                <Card>
                    <Text ta="center" size="sm" c="dimmed">No se encontraron descargas.</Text>
                </Card>
                :
                <Tabs radius={"xs"} value={activeTab} onChange={setActiveTab}>
                    <Stack>
                        <Tabs.List>
                            {data?.sections.map((section, index: number) => (
                                <Tabs.Tab key={index} value={section.id.toString()} className={classes.tab}>{section.name}</Tabs.Tab>
                            ))}
                        </Tabs.List>

                        {data?.sections.map((section, index: number) => (
                            <Tabs.Panel
                                key={index}
                                value={section.id.toString()}
                            >
                                <Stack>
                                    {section.categories?.map((category, indexCategory: number) => {
                                        const colors = getCicloColor(indexCategory, theme.primaryColor)
                                        return (
                                            <Stack>
                                                <Card
                                                    p={16}
                                                    key={index}
                                                    style={{
                                                        border: "none",
                                                    }}
                                                >
                                                    <Card.Section
                                                        p={"md"}
                                                        style={{
                                                            backgroundColor: `${colors.bg}`,
                                                            color: `${colors.text}`
                                                        }}
                                                    >
                                                        <Group justify="space-between">
                                                            <Text fw={700}>{category.name}</Text>
                                                        </Group>
                                                    </Card.Section>
                                                </Card>

                                                {category.files?.map((download, indexGPC: number) => (
                                                    <Download {...download} key={indexGPC} color={colors.bg} />
                                                ))}
                                            </Stack>
                                        )
                                    })}
                                </Stack>
                            </Tabs.Panel>
                        ))}
                    </Stack>
                </Tabs>
            }
        </Container >
    )
}