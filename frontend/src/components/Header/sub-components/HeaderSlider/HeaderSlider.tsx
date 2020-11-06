import { useState, useEffect } from 'react';
import Link from 'next/link';

import { Swiper, Slide } from "react-dynamic-swiper";
import cxs from 'cxs'

const HeaderSlider = () => {

    const className = cxs({
        ':after': {
            color: 'grey',
            fontSize: '14px'
        }
    })

    const params = {
        initialSlide: 0,
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        shouldSwiperUpdate: true,
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
        autoplay: {
            delay: 4500,
            disableOnInteraction: false
        },
        navigation: {
            nextEl: '.swiper-button-next h-4',
            prevEl: '.swiper-button-prev h-4'
        },
        renderNextButton: () => <button className={`swiper-button-next h-4 ${className}`}></button>,
        renderPrevButton: () => <button className={`swiper-button-prev h-4 ${className}`}></button>,
    }


    return (
        <div className=" bg-gray-100">
            <div style={{ width: '50%' }} className="py-4  mx-auto overflow-hidden mb-16">
                <div className="w-full text-center relative mx-auto">

                    {/* <Swiper {...params}>
                        {/* <SwiperSlide>FREE delivery for anyone!</SwiperSlide> */}
                    {/* <SwiperSlide>3-5 day delivery*</SwiperSlide> */}
                    {/* <Slide>Good news! We are dispatching normally and making sure contactless delivery</lide> */}
                    {/* </Swiper> */}
                    <div>Good news! We are dispatching normally!</div>


                </div>
            </div>
        </div>


    );
}

export default HeaderSlider;