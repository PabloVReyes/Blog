import { Fieldset, Group, Loader } from "@mantine/core";
import { ManualsGrid } from "./ManualsGrid";
import { ExtraManuals } from "./ExtraManuals";

interface Props {
    area: any;
    showExtras?: boolean;
    showMain?: boolean;
    fullWidth?: boolean;
    numberColums?: number
}

export const AreaSection = ({ area, showExtras, showMain = true, fullWidth = false, numberColums }: Props) => {
    if (area.loading) return <Loader size="sm" />;

    return (
        <Fieldset legend={area.area.name} style={{ textAlign: "center", height: "100%", justifyContent: "center", width: fullWidth ? "100%" : '', flex: 1 }}>
            <Group justify="center" wrap="wrap" gap={3}>
                {showMain && <ManualsGrid {...area.area} />}

                {showExtras && <ExtraManuals numberColums={numberColums} {...area.area} />}
            </Group>
        </Fieldset>
    );
};
