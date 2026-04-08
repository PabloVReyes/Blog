import { Button, SimpleGrid, Stack } from "@mantine/core";
import { useDownloadFile } from "@/hooks";
import type { ManualData } from "../../types/manuals.types";

interface Props {
    manuals: ManualData[];
    numberColums?: number;
}

export const ExtraManuals = ({ manuals = [], numberColums }: Props) => {
    const { download } = useDownloadFile();

    const extras = manuals.filter(m => m.manualType.category === "EXTRA");

    if (extras.length === 0) return null;

    const byType = extras.reduce((acc, m) => {
        acc[m.manualType.id] = m;
        return acc;
    }, {} as Record<string, ManualData>);

    const extraTypeIds = Object.keys(byType);

    const renderButton = (typeId: string) => {
        const manual = byType[typeId];
        const isAvailable = !!manual?.fileId;

        return (
            <Button
                key={typeId}
                size="compact-xs"
                color={manual?.manualType.color ?? "gray"}
                disabled={!isAvailable}
                onClick={() => manual?.fileId && download(manual.fileId)}
            >
                {manual.manualType.name}
            </Button>
        );
    };

    if (numberColums) {
        return (
            <SimpleGrid
                cols={{ base: 1, xs: numberColums }}
                spacing={2}
                mt={2}
            >
                {extraTypeIds.map(renderButton)}
            </SimpleGrid>
        );
    }

    const chunkSize = 2;
    const columns = Array.from(
        { length: Math.ceil(extraTypeIds.length / chunkSize) },
        (_, i) => extraTypeIds.slice(i * chunkSize, i * chunkSize + chunkSize)
    );

    return (
        <SimpleGrid
            cols={{ base: 1, sm: 1, md: columns.length }}
            spacing={2}
        >
            {columns.map((col, i) => (
                <Stack key={i} gap={2}>
                    {col.map(renderButton)}
                </Stack>
            ))}
        </SimpleGrid>
    );
};