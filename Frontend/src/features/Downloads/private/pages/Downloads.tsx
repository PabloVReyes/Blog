import { Container, Panel } from "@/components"
import { useModalStore } from "@/layout"
import { AddDownloads } from "../components/Downloads/Add"

export const Downloads = () => {
    const { openModal } = useModalStore()

    const handleAdd = () => {
        openModal({
            content: (
                <AddDownloads />
            )
        })
    }

    return (
        <Container
            title="Descargar Información"
            description="Descarga de información de diferentes áreas"
        >
            <Panel
                title
                titleValue="Lista de descargas"
                onAddElement={handleAdd}
            >
                Hola
            </Panel>
        </Container>
    )
}