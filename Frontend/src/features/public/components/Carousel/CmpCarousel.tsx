import { Carousel } from '@mantine/carousel';
import classes from './style.module.css'
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useRef, useState } from 'react';
import { getCarousel } from '@/api/carousel';
import { Image, Text, Title } from '@mantine/core';

export const CmpCarousel = () => {
    const [data, setData] = useState<string[]>([])

    useEffect(() => {
        getCarousel().then(setData)
    }, [])

    const autoplay = useRef(Autoplay({ delay: 5000 }));

    return (
        <Carousel
            withIndicators
            height={'50dvh'}
            classNames={classes}
            emblaOptions={{ loop: true, align: 'start' }}
            plugins={[autoplay.current]}
            onMouseEnter={autoplay.current.stop}
            onMouseLeave={() => autoplay.current.play()}
        >
            {/* Si no hay elementos */}
            {data.length < 1 && (
                <Carousel.Slide
                    style={{
                        borderRadius: "12px",
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
                </Carousel.Slide>
            )}

            {data.map((item: any, index) => (
                <Carousel.Slide
                    key={index}
                    style={{
                        borderRadius: "12px",
                        overflow: "hidden",
                    }}
                >
                    <div
                        onClick={() => item.url && window.open(item.url, "_blank")}
                        style={{
                            position: "relative",
                            width: "100%",
                            height: "100%",
                            cursor: item.url ? "pointer" : "default"
                        }}
                    >
                        {/* Imagen */}
                        <Image
                            src={item.image}
                            height="100%"
                            width="100%"
                            fit="cover"
                            style={{
                                objectPosition: "center",
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
                    </div>
                </Carousel.Slide>
            ))}
        </Carousel>
    );
}
