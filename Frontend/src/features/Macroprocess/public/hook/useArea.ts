import { useEffect, useState } from 'react'
import { getAreaById } from '../api'

export function useArea(areaId: string) {
    const [area, setArea] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!areaId) return

        getAreaById(areaId)
            .then(setArea)
            .finally(() => setLoading(false))
    }, [areaId])

    return { area, loading }
}