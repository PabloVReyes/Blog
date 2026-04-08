import { useEffect, useState } from 'react';
import { getManual } from '../api';
import type { ManualData } from '../../types/manuals.types';

type ManualError = 
    | { type: "rate-limit" }
    | { type: "partial-error" }
    | { type: "fatal"; detail: unknown };
    
export function useManualMap(manualTypes: string[]) {
    const [manuals, setManuals] = useState<Record<string, ManualData>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<ManualError | null>(null);

    useEffect(() => {
        if (!manualTypes || manualTypes.length === 0) return;

        let isMounted = true;

        setLoading(true);
        setError(null);

        Promise.allSettled(
            manualTypes.map(type => getManual(type))
        )
            .then(results => {
                if (!isMounted) return;

                const map: Record<string, any> = {};
                let hasError = false;

                results.forEach((result, index) => {
                    const key = manualTypes[index];

                    if (result.status === "fulfilled") {
                        map[key] = result.value;
                    } else {
                        map[key] = null; // importante
                        hasError = true;

                        // opcional: detectar 429
                        if (result.reason?.response?.status === 429) {
                            setError({ type: "rate-limit" });
                        }
                    }
                });

                setManuals(map);

                if (hasError && !error) {
                    setError((prev: any) => prev ?? { type: "partial-error" });
                }
            })
            .catch(err => {
                if (!isMounted) return;
                setError({ type: "fatal", detail: err });
            })
            .finally(() => {
                if (isMounted) setLoading(false);
            });

        return () => {
            isMounted = false;
        };
    }, [manualTypes.join(',')]);

    return { manuals, loading, error };
}