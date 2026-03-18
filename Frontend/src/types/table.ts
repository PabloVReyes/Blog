export type Column<T> = {
    key: keyof T | string
    label: string
    align?: "left" | "center" | "right"
    miw?: number
    render?: (row: T) => React.ReactNode
}