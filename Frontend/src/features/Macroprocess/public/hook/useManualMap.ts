import { useEffect, useState } from 'react';
import { getManual } from '../api';

export function useManualMap(manualTypes: string[]) {
    const [manuals, setManuals] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<any>(null);

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
                setError({ type: "fatal", err });
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