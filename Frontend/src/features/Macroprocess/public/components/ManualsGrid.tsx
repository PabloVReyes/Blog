import { Button, Group } from "@mantine/core";
import type { ManualData } from "../../types/manuals.types";
import { useDownloadFile } from "@/hooks";

interface Props {
    manuals: ManualData[];
}

const ORDER = ["MO", "MP", "DxSit", "PT"];

export const ManualsGrid = ({ manuals }: Props) => {
    const { download } = useDownloadFile()

    const byType = manuals.reduce((acc, m) => {
        acc[m.manualType.id] = m;
        return acc;
    }, {} as Record<string, any>);

    const hasFile = (code: string) =>
        byType[code] && byType[code].fileId;

    return (
        <Group
            gap={2}
            wrap="wrap"
            justify="center"
            style={{ maxWidth: 120 }}   // 2 botones de 50px + gap
        >
            {ORDER.map(code => {
                const manual = byType[code];

                return (
                    <Button
                        key={code}
                        size="compact-xs"
                        w={50}
                        color={manual?.manualType.color || "gray"}
                        disabled={!hasFile(code)}
                        onClick={() => download(manual.fileId)}
                    >
                        {code}
                    </Button>
                );
            })}
        </Group>
    );
};
