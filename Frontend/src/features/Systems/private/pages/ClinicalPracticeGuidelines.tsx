import { Container, Panel, Table } from "@/components"
import { useModalStore } from "@/layout"
import { ActionsClinicalPracticeGuidelines, AddClinicalPracticeGuidelines } from "../components"
import { useClinicalPracticeGuidelinesStore } from "../store"
import { Notify } from "@/ui"
import { useEffect } from "react"
import { useDebouncedValue } from "@mantine/hooks"
import { Badge, Text } from "@mantine/core"

const columns = [
    {
        key: 'code',
        label: 'Clave',
        align: 'left',
    },
    {
        key: "title",
        label: "Título",
        align: 'left',
    },
    {
        key: "cateogry",
        label: "Categoria",
        align: 'center',
        miw: "150px",
        render: (row: any) => {
            return (
                <Badge size="sm">{row.category.name}</Badge>
            )
        }
    },
    {
        key: "er",
        label: "Guía de Evidencias y Recomendaciones",
        align: 'left',
        render: (row: any) => {
            return (
                <Text size="sm"
                    style={{
                        overflowWrap: "anywhere",
                        wordBreak: "break-word",
                    }}
                >{row.fileNameER}</Text>
            )
        }
    },
    {
        key: "rr",
        label: "Guía de Referencia Rápida",
        align: 'left',
        render: (row: any) => {
            return (
                <Text size="sm"
                    style={{
                        overflowWrap: "anywhere",
                        wordBreak: "break-word",
                    }}
                >{row.fileNameRR}</Text>
            )
        }
    },
    {
        key: "actions",
        label: "Acciones",
        align: "center",
        render: (row: any) => {
            return <ActionsClinicalPracticeGuidelines {...row} />
        }
    }
]


export const ClinicalPracticeGuidelines = () => {
    const { openModal } = useModalStore()
    const { items, fetch, setSearch, search, isLoading, page, limit, totalItems, totalPages, setLimit, firstItem, lastItem, setPage } = useClinicalPracticeGuidelinesStore()
    const [debounced] = useDebouncedValue(search, 500)

    useEffect(() => {
        handleFetch()
    }, [debounced, page, limit])

    const handleFetch = async () => {
        try {
            await fetch()
        } catch (error: any) {
            Notify({
                type: "error",
                title: "Error al obtener informes mensuales",
                message: error.message
            })
        }
    }

    const handleAdd = () => {
        openModal({
            content: <AddClinicalPracticeGuidelines />
        })
    }

    return (
        <Container
            title="Guías de Práctica Clínica"
            description="Conjunto de recomendaciones basadas en la mejor evidencia científica, desarrolladas sistemáticamente para ayudar a profesionales de la salud y pacientes a tomar decisiones sobre la atención médica más adecuada para una condición específica, buscando optimizar la calidad, seguridad y eficiencia del cuidado, y reduciendo la variabilidad clínica"
        >
            <Panel
                title
                titleValue="Lista de guías"
                onAddElement={handleAdd}
                search
                searchValue={search}
                onChangeSearch={setSearch}
                searchPlaceholder="Buscar Informe..."
                limit
                limitValue={limit}
                onChangeLimit={setLimit}
                page
                pageValue={page}
                onChangePage={setPage}
                firstItem={firstItem}
                lastItem={lastItem}
                totalItems={totalItems}
                totalPages={totalPages}
            >
                <Table
                    isLoading={isLoading}
                    data={items}
                    columns={columns}
                />
            </Panel>
        </Container>
    )
}