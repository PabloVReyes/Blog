export const buildParams = (params: Record<string, string | number | undefined>) => {
    const q = new URLSearchParams()
    for (const [key, value] of Object.entries(params)) {
        if (value !== undefined && value !== '') {
            q.append(key, String(value))
        }
    }
    return q.toString()
}