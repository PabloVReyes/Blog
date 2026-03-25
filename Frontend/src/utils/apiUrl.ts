// utils/apiUrl.ts
export const getApiAssetUrl = (path: string): string => {
    if (!path) return ''
    if (path.startsWith('http')) return path  // ya es URL absoluta
    const base = import.meta.env.VITE_API_URL ?? ''
    return `${base}${path}`
}
