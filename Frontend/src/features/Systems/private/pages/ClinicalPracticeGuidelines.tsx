import { Container, Panel, Table } from "@/components"
import { useModalStore } from "@/layout"
import { ActionsClinicalPracticeGuidelines, AddClinicalPracticeGuidelines } from "../components"
import { Notify } from "@/ui"
import { useEffect } from "react"
import { useDebouncedValue } from "@mantine/hooks"
import { Badge, Text } from "@mantine/core"
import { useSystemsClinicalPracticeGuidelinesStore } from "@/stores"
import type { Column } from "@/types"
import type { ClinicalPracticeGuidelinesData } from "../../types/ClinicalPracticeGuidelines.types"

const columns: Column<ClinicalPracticeGuidelinesData>[] = [
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
        miw: 150,
        render: (row) => {
            return (
                <Badge variant="filled" size="sm">{row.category.name}</Badge>
            )
        }
    },
    {
        key: "er",
        label: "Guía de Evidencias y Recomendaciones",
        align: 'left',
        render: (row) => {
            return (
                <Text size="sm"
                    style={{
                        overflowWrap: "anywhere",
                        wordBreak: "break-word",
                    }}
                >{row.fileER?.name}</Text>
            )
        }
    },
    {
        key: "rr",
        label: "Guía de Referencia Rápida",
        align: 'left',
        render: (row) => {
            return (
                <Text size="sm"
                    style={{
                        overflowWrap: "anywhere",
                        wordBreak: "break-word",
                    }}
                >{row.fileRR?.name}</Text>
            )
        }
    },
    {
        key: "actions",
        label: "Acciones",
        align: "center",
        render: (row) => {
            return <ActionsClinicalPracticeGuidelines {...row} />
        }
    }
]


export const ClinicalPracticeGuidelines = () => {
    const { openModal } = useModalStore()
    const { items, fetch, setSearch, search, isLoading, page, limit, totalItems, totalPages, setLimit, firstItem, lastItem, setPage } = useSystemsClinicalPracticeGuidelinesStore()
    const [debounced] = useDebouncedValue(search, 500)

    useEffect(() => {
        handleFetch()
    }, [debounced, page, limit])

    const handleFetch = async () => {
        try {
            await fetch?.()
        } catch (error: unknown) {
            Notify({
                type: "error",
                title: "Error al guías de practica clínica",
                message: error instanceof Error ? error.message : "Error desconocido"
            })
        }
    }

    const handleAdd = () => {
        openModal({
            title: "Agregar Guía de Práctica Clínica",
            subtitle: "Agregar nueva Guía de Práctica Clínica",
            icon: "IconPlus",
            content: (
                <AddClinicalPracticeGuidelines />
            )
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
                searchPlaceholder="Buscar guías..."
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