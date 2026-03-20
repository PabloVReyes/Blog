import { Fieldset, Group, Loader } from "@mantine/core";
import { ManualsGrid } from "./ManualsGrid";
import { ExtraManuals } from "./ExtraManuals";

interface Props {
    area: AreaProps;
    showExtras?: boolean;
    showMain?: boolean;
    fullWidth?: boolean;
    numberColums?: number
}

export interface AreaProps {
    area: Area | null;
    loading: boolean;
}

export interface Area {
    id: string;
    name: string;
    category: string;
    manager: null;
    description: null;
    createdAt: Date;
    updatedAt: Date;
    manuals: Manual[];
}

export interface Manual {
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

export const AreaSection = ({ area, showExtras, showMain = true, fullWidth = false, numberColums }: Props) => {
    if (area.loading) return <Loader size="sm" />;

    return (
        <Fieldset legend={area.area?.name} style={{ textAlign: "center", height: "100%", justifyContent: "center", width: fullWidth ? "100%" : '', flex: 1 }}>
            <Group justify="center" wrap="wrap" gap={3}>
                {showMain && <ManualsGrid {...area.area} />}

                {showExtras && <ExtraManuals numberColums={numberColums} {...area.area} />}
            </Group>
        </Fieldset>
    );
};
