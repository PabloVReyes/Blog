import { ActionIcon, Transition } from "@mantine/core";
import { IconArrowUp, IconArrowDown } from "@tabler/icons-react";
import type { RefObject } from "react";

interface Props {
    showTop: boolean;
    showBottom: boolean;
    scrollContainer: RefObject<HTMLDivElement | null>;
}

export const ScrollButtons = ({ showTop, showBottom, scrollContainer }: Props) => {
    const scrollToTop = () =>
        scrollContainer.current?.scrollTo({ top: 0, behavior: "smooth" });

    const scrollToBottom = () =>
        scrollContainer.current?.scrollTo({
            top: scrollContainer.current.scrollHeight,
            behavior: "smooth",
        });

    return (
        <>
            <Transition transition="slide-up" mounted={showTop}>
                {(styles) => (
                    <ActionIcon size="xl" radius="xl" style={styles} onClick={scrollToTop}>
                        <IconArrowUp size={24} />
                    </ActionIcon>
                )}
            </Transition>

            <Transition transition="slide-up" mounted={showBottom}>
                {(styles) => (
                    <ActionIcon size="xl" radius="xl" style={styles} onClick={scrollToBottom}>
                        <IconArrowDown size={24} />
                    </ActionIcon>
                )}
            </Transition>
        </>
    );
};