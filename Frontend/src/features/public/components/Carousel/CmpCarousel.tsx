import { Carousel } from '@mantine/carousel';
import classes from './style.module.css'
import Autoplay from 'embla-carousel-autoplay';
import { useEffect, useRef, useState } from 'react';
import { getCarousel } from '@/api/carousel';
import { Image, Text, Title } from '@mantine/core';

export const CmpCarousel = () => {
    const [data, setData] = useState<string[]>([])


    useEffect(() => {
        getCarousel()
            .then(setData)
    }, [])

    console.log(data)
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
            {data.map((item: any, index) => (
                <Carousel.Slide key={index}>
                    <div
                        onClick={() => window.location.href = item.url}
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
                            style={{ objectPosition: "center" }}
                        />

                        {/* Título */}
                        <div
                            style={{
                                position: "absolute",
                                top: 0,
                                width: "100%",
                                padding: "10px 20px",
                                background: "rgba(0, 0, 0, 0.4)",
                                color: "white",
                                fontSize: "20px",
                                fontWeight: 600,
                                backdropFilter: "blur(4px)",
                                textAlign: "left" // cambia a "center" o "right"
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