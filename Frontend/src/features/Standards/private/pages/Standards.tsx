import { Container, Panel, Table } from "@/components"
import { useModalStore } from "@/layout"
import { Actions, Add } from "../components"
import { useDebouncedValue } from "@mantine/hooks"
import { useEffect } from "react"
import { Notify } from "@/ui"
import { Text } from "@mantine/core"
import { useStandardsStore } from "@/stores"
import type { Column } from "@/types"


export interface Row {
    id: number;
    name: string;
    description: string;
    isNew: boolean;
    fileName: string;
    filePath: string;
    fileSize: number;
    mimeType: string;
    categoryId: number;
    createdAt: Date;
    updatedAt: Date;
    category: Category;
}

export interface Category {
    id: number;
    name: string;
    createdAt: Date;
    updatedAt: Date;
}

const columns: Column<Row>[] = [
    {
        key: 'name',
        label: 'Nombre',
        align: 'left',
    },
    {
        key: 'description',
        label: 'Descripción',
        align: 'left',
        render: (row) => {
            if (!row.description) {
                return <Text size="xs" c="dimmed">------</Text>
            }

            return <Text size="sm">{row.description}</Text>
        }
    },
    {
        key: 'category',
        label: 'Categoria',
        align: 'center',
        render: (row) => {
            return (
                <Text size="sm">{row.category?.name}</ Text>
            )
        }
    },
    {
        key: 'file',
        label: 'Archivo',
        align: 'center',
        render: (row) => {
            return (
                <Text size="sm"
                    style={{
                        overflowWrap: "anywhere",
                        wordBreak: "break-word",
                    }}
                >{row.fileName}</Text>
            )
        }
    },
    {
        key: 'actions',
        label: 'Acciones',
        align: 'left',
        render: (row) => {
            return <Actions {...row} />
        }
    },
]


export const Standards = () => {
    const { openModal } = useModalStore()
    const {
        items,
        fetch,
        setSearch,
        search,
        isLoading,
        page,
        limit,
        totalItems,
        totalPages,
        setLimit,
        firstItem,
        lastItem,
        setPage
    } = useStandardsStore()
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
                title: "Error al obtener normas oficiales",
                message: error instanceof Error ? error.message : "Error desconocido"
            })
        }
    }

    const handleAdd = () => {
        openModal({
            content: <Add />
        })
    }

    return (
        <Container
            title="Normas Oficilaes Mexicanas"
            description="Las Normas Oficiales Mexicanas (NOM) son regulaciones técnicas de observancia obligatoria expedidas por las dependencias competentes, que tienen como finalidad establecer las características que deben reunir los procesos o servicios cuando estos puedan constituir un riesgo para la seguridad de las personas o dañar la salud humana; así como aquellas relativas a terminología y las que se refieran a su cumplimiento y aplicación.
                    Las NOM en materia de Prevención y Promoción de la Salud, una vez aprobadas por el Comité Consultivo Nacional de Normalización de Prevención y Control de Enfermedades (CCNNPCE) son expedidas y publicadas en el Diario Oficial de la Federación y, por tratarse de materia sanitaria, entran en vigor al día siguiente de su publicación."
        >
            <Panel
                title
                titleValue="Lista de normas"
                onAddElement={handleAdd}
                limit
                limitValue={limit}
                onChangeLimit={setLimit}
                page
                pageValue={page}
                totalPages={totalPages}
                totalItems={totalItems}
                lastItem={lastItem}
                firstItem={firstItem}
                onChangePage={setPage}
                search
                searchPlaceholder="Buscar norma..."
                searchValue={search}
                onChangeSearch={setSearch}
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