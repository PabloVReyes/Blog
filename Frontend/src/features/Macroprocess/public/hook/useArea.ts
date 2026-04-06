import { useEffect, useState } from 'react'
import { getAreaById } from '../api'

export function useArea(areaId: string) {
    const [area, setArea] = useState<any>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<any>(null)

    useEffect(() => {
        if (!areaId) return

        let isMounted = true

        setLoading(true)
        setError(null)

        getAreaById(areaId)
            .then(res => {
                if (!isMounted) return
                setArea(res)
            })
            .catch(err => {
                if (!isMounted) return

                if (err?.response?.status === 429) {
                    setError({ type: 'rate-limit' })
                } else {
                    setError({ type: 'error', err })
                }

                setArea(null)
            })
            .finally(() => {
                if (isMounted) setLoading(false)
            })

        return () => {
            isMounted = false
        }
    }, [areaId])

    return { area, loading, error }
}