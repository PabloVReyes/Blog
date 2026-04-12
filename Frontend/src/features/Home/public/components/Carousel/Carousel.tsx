import { Carousel as MantineCarousel } from '@mantine/carousel';
import classes from './Carousel.module.css'
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
import { Image, Text, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import type { CarouselData } from '@/features/Home/types/carousel.types';
import { useDownloadFile } from '@/hooks';

interface Props {
    items: CarouselData[]
}

export const Carousel = ({ items }: Props) => {
    const { view } = useDownloadFile()

    const navigate = useNavigate();

    interface HandleNavigateProps {
        type: string | null;
        url?: string | null;
        file: {
            id: string;
        };
    }

    const handleNavigate = ({ type, url, file }: HandleNavigateProps) => {
        if (type === "page") {
            if (!url) return;

            if (url.startsWith("http")) {
                window.open(url, "_blank");
            } else {
                navigate(url);
            }
        } else {
            view(file.id)
        }
    };

    const autoplay = useRef(Autoplay({ delay: 10000 }));

    return (
        <MantineCarousel
            withIndicators
            classNames={classes}
            emblaOptions={{ loop: true, align: 'start' }}
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={() => autoplay.current.play()}
            h="100%"
            style={{ flex: 1 }}
        >
            {/* Si no hay elementos */}
            {items.length < 1 && (
                <MantineCarousel.Slide
                    style={{
                        borderRadius: "15px",
                        overflow: "hidden",
                        border: "1px solid light-dark(var(--mantine-color-gray-3), var(--mantine-color-dark-4))",
                    }}
                >
                    <Text
                        size='sm'
                        c="dimmed"
                        style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        Sin elementos
                    </Text>
                </MantineCarousel.Slide>
            )}

            {items.map((item) => (
                <MantineCarousel.Slide
                    key={item.id}
                    style={{
                        borderRadius: "15px",
                        overflow: "hidden",
                    }}
                    h="100%"
                >
                    <div
                        onClick={() => handleNavigate(item)}
                        style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            overflow: "hidden",
                            borderRadius: "16px",
                            cursor: item.type === "null" ? "default" : "pointer",
                        }}
                    >
                        {/* Imagen */}
                        <Image
                            src={`${import.meta.env.VITE_API_URL}${item.imageUrl}`}
                            h="100%"
                            w="100%"
                            fit="contain"
                            style={{
                                position: 'absolute', // 👈 Evita que la imagen "empuje" el alto
                                top: 0,
                                left: 0
                            }}
                        />

                        {/* Título + Descripción */}
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                width: "100%",
                                padding: "10px 20px",
                                background: "rgba(0, 0, 0, 0.4)",
                                color: "white",
                                backdropFilter: "blur(4px)",
                                textAlign: "left",
                            }}
                        >
                            <Title order={3}>{item.title}</Title>
                            <Text size='sm'>{item.description}</Text>
                        </div>

                        <div
                            style={{
                                position: "absolute",
                                bottom: 15,
                                right: 15,
                                borderRadius: "30px",
                                padding: "10px 20px",
                                background: "rgba(0, 0, 0, 0.4)",
                                color: "white",
                                backdropFilter: "blur(4px)",
                                textAlign: "right",
                            }}
                        >
                            <Text size='xs' fw={700}>
                                {item.type === "page" && "Página"}
                                {item.type === "file" && "Archivo"}
                                {item.type === "null" && "Sin acciones"}
                            </Text>
                        </div>
                    </div>
                </MantineCarousel.Slide>
            ))}
        </MantineCarousel>
    );
}
