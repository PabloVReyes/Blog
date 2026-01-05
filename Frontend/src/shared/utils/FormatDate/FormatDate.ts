export const formatDate = (data: Date) => {
    const date = new Date(data)
    return date.toLocaleString("es-MX", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    })
}