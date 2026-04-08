import { useEffect, useState } from 'react'
import { getAreaById } from '../api'

export interface Area {
    id: string;
    name: string;
    category: string;
    manager: null;
    description: null;
    createdAt: Date;
    updatedAt: Date;
    manuals: Manual[];
}

export interface Manual {
    id: string;
    fileId: null;
    areaId: string;
    manualTypeId: string;
    createdAt: Date;
    updatedAt: Date;
    manualType: ManualType;
    file: null;
}

export interface ManualType {
    id: string;
    name: string;
    color: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}

type Error =
    | { type: "rate-limit" }
    | { type: "partial-error" }
    | { type: "fatal"; detail: unknown };

export function useArea(areaId: string) {
    const [area, setArea] = useState<Area | null>(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<Error | null>(null)

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
                    setError({ type: 'fatal', detail: err })
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