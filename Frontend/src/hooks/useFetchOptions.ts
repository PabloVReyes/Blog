import { useState, useEffect, useCallback } from "react";

export const useFetchOptions = <T>(fetchFn: () => Promise<{ data: T[] }>) => {
    const [options, setOptions] = useState<T[]>([]);
    const [loading, setLoading] = useState(false);

    const load = useCallback(async () => {
        setLoading(true);
        try {
            const res = await fetchFn();
            setOptions(res.data || []);
        } catch (error) {
            console.error("Error fetching options:", error);
        } finally {
            setLoading(false);
        }
    }, [fetchFn]);

    useEffect(() => { load(); }, [load]);

    return { options, setOptions, loading, reload: load };
};