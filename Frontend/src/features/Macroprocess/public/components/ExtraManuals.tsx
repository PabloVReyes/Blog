import { Button, SimpleGrid, Stack } from "@mantine/core";
import { downloadManual } from "../api";

interface Props {
    manuals: Manuals[];
    numberColums?: number
}

export interface Manuals {
    id: string;
    fileName: null;
    filePath: null;
    fileSize: null;
    mimeType: null;
    areaId: string;
    manualTypeId: string;
    createdAt: Date;
    updatedAt: Date;
    manualType: ManualType;
}

export interface ManualType {
    id: string;
    name: string;
    color: string;
    category: string;
    createdAt: Date;
    updatedAt: Date;
}

export const ExtraManuals = ({ manuals, numberColums }: Props) => {
    const extras = manuals.filter(
        m => m.manualType.category === "EXTRA"
    );

    const download = async (id: string) => {
        try {
            const response = await downloadManual(id)

            const disposition = response.headers["content-disposition"];

            const fileName =
                disposition?.split("filename=")[1]?.replace(/"/g, "") ||
                "manual.pdf";

            const blob = new Blob([response.data], {
                type: response.headers["content-type"]
            });

            const link = document.createElement("a");

            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;

            document.body.appendChild(link);
            link.click();

            link.remove();
            window.URL.revokeObjectURL(link.href);

        } catch (error) {
            console.error("Error al descargar archivo", error);
        }
    };

    const byType = extras.reduce((acc, m) => {
        acc[m.manualType.id] = m;
        return acc;
    }, {} as Record<string, any>);

    const hasFile = (typeId: string) =>
        byType[typeId] && byType[typeId].filePath;

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
                            onClick={() => downloadManual(manual.id)}
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
                                onClick={() => download(manual.id)}
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