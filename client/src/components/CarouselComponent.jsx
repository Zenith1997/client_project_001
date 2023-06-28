import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselComponent = ({ slides }) => {
    return (
        <Carousel showArrows showThumbs={false}>
            {slides.map((slide, index) => (
                <div key={index}>
                    <img
                        src={`${process.env.REACT_APP_BASE_URL}/assets/${slide.image}`}

                        style={{ maxWidth: '200px', maxHeight: '200px' }}
                    />
                </div>
            ))}
        </Carousel>
    );
};

export default CarouselComponent;
