import { Button, Group } from "@mantine/core";
import { downloadManual } from "../api";

interface Props {
    manuals: any[];
}

const ORDER = ["MO", "MP", "DxSit", "PT"];

export const ManualsGrid = ({ manuals }: Props) => {

    const byType = manuals.reduce((acc, m) => {
        acc[m.manualType.id] = m;
        return acc;
    }, {} as Record<string, any>);

    const hasFile = (code: string) =>
        byType[code] && byType[code].filePath;

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
                        autoContrast
                        size="compact-xs"
                        w={50}
                        color={manual?.manualType.color || "gray"}
                        disabled={!hasFile(code)}
                        onClick={() => download(manual.id)}
                    >
                        {code}
                    </Button>
                );
            })}
        </Group>
    );
};
