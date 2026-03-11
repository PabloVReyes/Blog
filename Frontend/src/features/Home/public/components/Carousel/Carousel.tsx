import { Carousel as MantineCarousel } from '@mantine/carousel';
import classes from './Carousel.module.css'
import Autoplay from 'embla-carousel-autoplay';
import { useRef } from 'react';
// import { getCarousel } from '@/api/carousel';
import { Image, Text, Title } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { downloadCarousel } from '../../api';

export const Carousel = ({ items }: any) => {
    const navigate = useNavigate();

    const download = async (id: string) => {
        try {
            const response = await downloadCarousel(id)

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

    const handleNavigate = ({ type, url, id }: any) => {
        if (type === "page") {
            if (!url) return;

            // externa
            if (url.startsWith("http")) {
                window.open(url, "_blank"); // o window.location.href = url;
            } else {
                // interna SPA
                navigate(url);
            }
        } else {
            download(id)
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

            {items.map((item: any, index: number) => (
                <MantineCarousel.Slide
                    key={index}
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
