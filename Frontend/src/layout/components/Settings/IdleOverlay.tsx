import { useEffect, useRef, useState } from "react";
import { Portal } from "@mantine/core";
import Lottie from "lottie-react";
import SpaceCatAnimation from "@/assets/space_cat.json";

interface Props {
    isOnline: boolean;
    disableIdleDetector: boolean;
}

export const IdleOverlay = ({ isOnline, disableIdleDetector }: Props) => {
    const [show, setShow] = useState(false);
    const [rotation, setRotation] = useState(0);
    const timer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (!isOnline || disableIdleDetector) return;

        const reset = () => {
            if (timer.current) clearTimeout(timer.current);
            setShow(false);

            timer.current = setTimeout(() => setShow(true), 30 * 60 * 1000);
        };

        const events = ["mousemove", "keydown", "scroll", "click", "touchstart"];

        events.forEach((event) =>
            window.addEventListener(event, reset)
        );

        reset();

        return () => {
            if (timer.current) clearTimeout(timer.current);
            window.removeEventListener("mousemove", reset);
        };
    }, [isOnline, disableIdleDetector]);

    const getRandomRotation = () => {
        const randomStep = Math.floor(Math.random() * 360) + 90;
        return randomStep;
    };

    if (!show) return null;

    return (
        <Portal>
            <div
                style={{
                    position: "fixed",
                    inset: 0,
                    zIndex: 3000,
                    background: "rgba(0,0,0,0.5)",
                    backdropFilter: "blur(6px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "visible",
                }}
            >
                <div
                    style={{
                        width: "100vw",
                        height: "100vh",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        transform: `rotate(${rotation}deg)`,
                        transformOrigin: "center center",
                        transition: "transform 0.8s ease-in-out",
                    }}
                >
                    <div
                        style={{
                            width: "180%",
                            height: "180%",
                            overflow: "visible",
                        }}
                    >
                        <Lottie
                            animationData={SpaceCatAnimation}
                            loop
                            autoplay
                            onLoopComplete={() => {
                                const randomRotation = getRandomRotation();
                                setRotation((prev) => prev + randomRotation);
                            }}
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                        />
                    </div>
                </div>
            </div>
        </Portal>
    );
};