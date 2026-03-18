// helpers/getTablerIcon

import * as TablerIcons from "@tabler/icons-react";
import type { Icon as TablerIconType } from "@tabler/icons-react";

type TablerIconName = keyof typeof TablerIcons;

export const getTablerIcon = (name?: string): TablerIconType => {
    if (name && (name as TablerIconName) in TablerIcons) {
        return TablerIcons[name as TablerIconName] as TablerIconType;
    }

    return TablerIcons.IconAlertCircle;
};