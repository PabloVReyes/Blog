import { Button, SimpleGrid, Stack } from "@mantine/core";
import { useDownloadFile } from "@/hooks";
import type { ManualData } from "../../types/manuals.types";

interface Props {
    manuals: ManualData[];
    numberColums?: number
}

export const ExtraManuals = ({ manuals, numberColums }: Props) => {
    const { download } = useDownloadFile()
    const extras = manuals.filter(
        m => m.manualType.category === "EXTRA"
    );

    const byType = extras.reduce((acc, m) => {
        acc[m.manualType.id] = m;
        return acc;
    }, {} as Record<string, any>);

    const hasFile = (typeId: string) =>
        byType[typeId] && byType[typeId].fileId;

    const extraTypes = [...new Set(
        extras.map(m => m.manualType.id)
    )];

    const columns: string[][] = [];

    for (let i = 0; i < extraTypes.length; i += 2) {
        columns.push(extraTypes.slice(i, i + 2));
    }

    if (!extraTypes.length) return null;

    if (numberColums) {
        return (
            <SimpleGrid cols={{ xs: numberColums }} spacing={2} style={{ justifyContent: "center" }} mt={2}>
                {extraTypes.map(typeId => {

                    const manual = byType[typeId];

                    return (
                        <Button
                            key={typeId}
                            size="compact-xs"
                            color={manual?.manualType.color || "gray"}
                            disabled={!hasFile(typeId)}
                            onClick={() => download(manual.fileId)}
                        >
                            {manual.manualType.name}
                        </Button>
                    );
                })}
            </SimpleGrid>
        )
    }

    return (
        <SimpleGrid cols={{ md: columns.length, xs: 1, sm: 1 }} spacing={2} style={{ justifyContent: "center" }}>
            {columns.map((col, i) => (
                <Stack key={i} gap={2}>
                    {col.map(typeId => {

                        const manual = byType[typeId];

                        return (
                            <Button
                                key={typeId}
                                size="compact-xs"
                                color={manual?.manualType.color || "gray"}
                                disabled={!hasFile(typeId)}
                                onClick={() => download(manual.fileId)}
                            >

                                {manual.manualType.name}
                            </Button>
                        );
                    })}
                </Stack>
            ))}
        </SimpleGrid>
    );
};