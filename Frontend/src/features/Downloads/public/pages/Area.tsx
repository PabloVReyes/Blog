import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { fecthArea } from "../api"
import { Notify } from "@/ui"
import { Center, Loader } from "@mantine/core"
import { Container } from "@/components"

interface Data {
    id: number;
    name: string;
    slug: string;
    icon: string;
    color: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export const Area = () => {
    const { slug } = useParams<{ slug: string }>()
    const [data, setData] = useState<Data>()
    const [loading, setLoading] = useState<boolean>(false);

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

    console.log(data)

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
            {slug}
        </Container>
    )
}