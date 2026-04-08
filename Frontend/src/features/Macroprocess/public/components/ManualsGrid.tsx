import { Button, Group } from "@mantine/core";
import type { ManualData } from "../../types/manuals.types";
import { useDownloadFile } from "@/hooks";

interface Props {
    manuals: ManualData[];
}

const ORDER = ["MO", "MP", "DxSit", "PT"] as const;

export const ManualsGrid = ({ manuals = [] }: Props) => {
    const { download } = useDownloadFile();

    if (manuals.length === 0) return null;

    const byType = manuals.reduce((acc, m) => {
        acc[m.manualType.id] = m;
        return acc;
    }, {} as Record<string, ManualData>);

    return (
        <Group
            gap={2}
            wrap="wrap"
            justify="center"
            style={{ maxWidth: 120 }} // Espacio para 2 columnas (50px * 2 + gap)
        >
            {ORDER.map(code => {
                const manual = byType[code];
                const isAvailable = !!manual?.fileId;

                return (
                    <Button
                        key={code}
                        size="compact-xs"
                        w={50}
                        color={manual?.manualType.color ?? "gray"}
                        disabled={!isAvailable}
                        // 4. El optional chaining (?.) evita errores si el botón no está deshabilitado correctamente
                        onClick={() => manual?.fileId && download(manual.fileId)}
                    >
                        {code}
                    </Button>
                );
            })}
        </Group>
    );
};