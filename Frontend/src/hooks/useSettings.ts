import { getSettings } from "@/api/settings";
import { useEffect, useState } from "react";

export function useSettings() {
    const [settings, setSettings] = useState<Record<string, string>>({});

    useEffect(() => {
        getSettings()
            .then(setSettings)
    }, []);

    return settings;
}