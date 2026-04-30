import type { ReactNode } from "react"
import { CrudDeleteDialog } from "./CrudDeleteDialog"

type CrudDeleteEntityProps = {
    id: number | string
    entityName: string
    confirmValue: string
    onDelete?: (id: string | number) => Promise<void>;
    label: string
    warnings?: string[]
    children?: ReactNode
}

export const CrudDeleteEntity = ({
    id,
    entityName,
    confirmValue,
    onDelete,
    label,
    warnings = [],
    children
}: CrudDeleteEntityProps) => {
    return (
        <CrudDeleteDialog
            id={id}
            confirmValue={confirmValue}
            titleEntity={entityName}
            onDelete={onDelete}
            label={label}
            warningItems={warnings}
        >
            {children}
        </CrudDeleteDialog>
    )
}