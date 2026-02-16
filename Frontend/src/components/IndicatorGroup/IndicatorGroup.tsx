import { useState, useRef } from "react";
import { UnstyledButton, FloatingIndicator, Text, Stack } from "@mantine/core";
import styles from "./IndicatorGroup.module.css";

interface IndicatorGroupProps {
    items: string[];
    activeIndex?: number;
    onChange?: (index: number) => void;
    label?: string;
    description?: string;
}

export const IndicatorGroup = ({ items, activeIndex = 0, onChange, label, description }: IndicatorGroupProps) => {
    const [active, setActive] = useState(activeIndex);
    const controlsRefs = useRef<Record<number, HTMLButtonElement | null>>({});
    const rootRef = useRef<HTMLDivElement>(null);

    const handleClick = (index: number) => {
        setActive(index);
        onChange?.(index);
    };

    return (
        <Stack gap={2}>
            {label && <Text size="sm" c={"light-dark(black, white)"}>{label}</Text>}
            {description && <Text c="light-dark(#6b7280, #9ca3af)" size="xs">{description}</Text>}
            <div className={styles.root} ref={rootRef}>
                {items.map((item, i) => (
                    <UnstyledButton
                        key={item}
                        ref={(el) => { controlsRefs.current[i] = el; }}
                        onClick={() => handleClick(i)}
                        className={`${styles.control} ${active === i ? styles.active : ""}`}
                    >
                        <span className={styles.controlLabel}>{item}</span>
                    </UnstyledButton>
                ))}
                <FloatingIndicator
                    target={controlsRefs.current[active]}
                    parent={rootRef.current}
                    className={styles.indicator}
                />
            </div>
        </Stack>
    );
};
