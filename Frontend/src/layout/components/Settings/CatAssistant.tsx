import { useEffect, useRef, useState } from "react";
import { Portal, Paper } from "@mantine/core";
import Lottie from "lottie-react";
import catAnimation from "@/assets/cat.json";
import { catMessages } from "@/utils";
import classes from "./CatAssistant.module.css"

interface Props {
    menuOpened: boolean;
}

export const CatAssistant = ({ menuOpened }: Props) => {
    const [message, setMessage] = useState("");
    const [showBubble, setShowBubble] = useState(false);

    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    useEffect(() => {
        if (!menuOpened) return;

        const showRandomMessage = () => {
            const random =
                catMessages[Math.floor(Math.random() * catMessages.length)];

            setMessage(random);
            setShowBubble(true);

            setTimeout(() => setShowBubble(false), 7000);
        };

        const timer = setTimeout(() => setShowBubble(false), 6000);

        intervalRef.current = setInterval(showRandomMessage, 10000);
        
        return () => clearTimeout(timer);

    }, [menuOpened]);

    if (!menuOpened) return null;

    return (
        <Portal>
            <div
                style={{
                    position: "fixed",
                    bottom: 180,
                    right: -20,
                    width: 400,
                    pointerEvents: "none",
                    zIndex: 2000,
                }}
            >
                {/* BURBUJA */}
                {showBubble && (
                    <Paper
                        shadow="md"
                        radius="md"
                        p="sm"
                        style={{
                            position: "absolute",
                            bottom: 270,
                            left: 120,
                            whiteSpace: "nowrap",
                            fontSize: 14,
                        }}
                        className={classes.speechBubble}
                    >
                        {message}
                    </Paper>
                )}

                <Lottie
                    animationData={catAnimation}
                    loop
                    autoplay
                />
            </div>
        </Portal>
    );
};