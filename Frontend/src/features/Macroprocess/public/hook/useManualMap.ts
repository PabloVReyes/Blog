import { useEffect, useMemo, useState } from 'react';
import { getManual } from '../api';
import type { ManualData } from '../../types/manuals.types';
import { useAppStore } from '@/stores';

type ManualError =
    | { type: "rate-limit" }
    | { type: "partial-error" }
    | { type: "fatal"; detail: unknown };

export function useManualMap(manualTypes: string[]) {
    const [manuals, setManuals] = useState<Record<string, ManualData | null>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ManualError | null>(null);

    const activateRateLimit = useAppStore(s => s.activateRateLimit);

    const dependencyKey = useMemo(() => {
        return JSON.stringify([...manualTypes].sort());
    }, [manualTypes]);

    useEffect(() => {
        if (!manualTypes || manualTypes.length === 0) {
            setLoading(false);
            return;
        }

        let isMounted = true;
        setLoading(true);
        setError(null);

        Promise.allSettled(manualTypes.map(type => getManual(type)))
            .then(results => {
                if (!isMounted) return;

                const map: Record<string, ManualData | null> = {};
                let hasRateLimit = false;
                let hasError = false;

                results.forEach((result, index) => {
                    const key = manualTypes[index];

                    if (result.status === "fulfilled") {
                        map[key] = result.value;
                    } else {
                        map[key] = null;
                        hasError = true;

                        if (result.reason?.response?.status === 429) {
                            hasRateLimit = true;
                            const retryAfter = parseInt(result.reason.response.headers?.['retry-after']) || 60;
                            activateRateLimit(retryAfter);
                        }
                    }
                });

                setManuals(map);

                if (hasRateLimit) {
                    setError({ type: "rate-limit" });
                } else if (hasError) {
                    setError({ type: "partial-error" });
                }
            })
            .catch(err => {
                if (!isMounted) return;
                setError({ type: "fatal", detail: err });
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => { isMounted = false; };

    }, [dependencyKey, activateRateLimit]);

    return { manuals, loading, error };
}