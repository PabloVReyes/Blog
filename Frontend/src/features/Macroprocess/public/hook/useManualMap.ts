import { useEffect, useState } from 'react';
import { getManual } from '../api';

export function useManualMap(manualTypes: string[]) {
    const [manuals, setManuals] = useState<Record<string, any>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!manualTypes || manualTypes.length === 0) return;

        setLoading(true);
        Promise.all(
            manualTypes.map(type => getManual(type))
        )
            .then(results => {
                const map: Record<string, any> = {};
                results.forEach((res, index) => {
                    map[manualTypes[index]] = res;
                });
                setManuals(map);
            })
            .finally(() => setLoading(false));
    }, [manualTypes.join(',')]);

    return { manuals, loading };
}
