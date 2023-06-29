import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselComponent = ({ slides }) => {
    const sortedSlides = [...slides]; // Create a copy of the slides array
    const iframeSlides = sortedSlides.filter(slide => slide.type === 'iframe'); // Filter out iframe slides
    const imageSlides = sortedSlides.filter(slide => slide.type === 'image'); // Filter out image slides

    // Concatenate iframe slides and image slides arrays
    const sortedAndFilteredSlides = [...iframeSlides, ...imageSlides];

    return (
        <Carousel showArrows showThumbs={false}>
            {sortedAndFilteredSlides.map((slide, index) => (
                <div key={index}>
                    {slide.type === 'iframe' && (
                        <iframe
                            src={slide.url}
                            style={{ width: '400px', height: '200px' }}
                            title="Slide Iframe"
                        />
                    )}
                    {slide.type === 'image' && (
                        <img
                            src={`${process.env.REACT_APP_BASE_URL}/assets/${slide.image}`}
                            style={{ maxWidth: '400px', maxHeight: '400px' }}
                            alt="Slide Image"
                        />
                    )}
                </div>
            ))}
        </Carousel>
    );
};

export default CarouselComponent;
