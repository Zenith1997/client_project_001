import React, {useEffect} from 'react';
import {Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, Navigation} from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";
import {setSliders} from "../store/sliderSlice";
import {useDispatch, useSelector} from "react-redux";


const HeroBanner = () => {
    const dispatch = useDispatch();
    const {sliders} = useSelector((state) => state.slider);

    useEffect(() => {
        async function fetchSlider() {
            await axios
                .get(`${process.env.REACT_APP_BASE_URL}/slider`)
                .then((res) => {
                    dispatch(setSliders(res.data));
                })
                .catch((err) => {
                    console.log(err)
                });
        }

        fetchSlider();
    }, []);

    return (
        <div
            className={`w-full bg-transparent`}
        >
            <Swiper
                slidesPerView={1}
                spaceBetween={30}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                loop={true}
                pagination={{
                    clickable: false,
                }}
                navigation={false}
                modules={[Autoplay, Navigation]}
                className='mainSwiper'
            >
                {sliders.map((slider) => (
                    <SwiperSlide key={slider.ID}>
                        <div className="flex flex-col lg:flex-row items-center py-3 md:py-8 px-2 md:px-4 lg:px-8">
                            <div className="lg:w-1/2">
                                <img
                                    src={`${process.env.REACT_APP_BASE_URL}/assets/${slider.Image}`}
                                    alt="Banner Image"
                                    className="w-auto h-48 sm:h-72 object-cover mx-auto"
                                />
                            </div>
                            <div className="lg:w-1/2 lg:pl-8 text-center md:text-left">
                                <h1 className="text-2xl md:text-4xl font-bold text-white mb-2 sm:mb-4">{slider.Title}</h1>
                                <p className="text-gray-300 mb-4">{slider.Description}</p>
                                <a
                                    href={slider.ButtonLink}
                                    target={"_blank"}
                                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-sm cursor-pointer"
                                >
                                    {slider.ButtonText}
                                </a>
                            </div>
                        </div>

                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default HeroBanner;