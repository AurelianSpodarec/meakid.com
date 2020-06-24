import { useState, useEffect } from 'react';
import Link from 'next/link';

import Swiper from 'react-id-swiper';
import cxs from 'cxs'

const Banner = ({ slides }) => {

    const className = cxs({
        ':after': {
            color: 'grey',
            fontSize: '14px'
        }
    })

    const params = {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
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


    function slide(text) {
        return (
            <div>
                {text}
            </div>
        )
    }

    return (
        <div className=" bg-gray-100">
            <div style={{ width: '50%' }} className="py-4  mx-auto overflow-hidden mb-16">
                <div className="w-full text-center relative mx-auto">


                    <Swiper {...params} containerClass="h-4 px-2 flex content-center text-xs uppercase">
                        <div>FREE delivery after <strong>£100</strong> spent</div>
                        <div>3-5 day delivery*</div>
                        <div>Good news! We are dispatching normally and making sure contactless delivery</div>
                    </Swiper >


                </div>
            </div>
        </div>


    );
}

export default Banner;