import { useState, useEffect } from 'react';
import Link from 'next/link';

import Swiper from 'react-id-swiper';

import dynamic from 'next/dynamic'


// import 'react-id-swiper/lib/styles/css/swiper.css';


const Banner = () => {
    const params = {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        pagination: {
            el: '.swiper-pagination',
            clickable: true
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        }
    }

    return (

        // <div className="h-16 bg-gray-100 overflow-hidden px-2 mb-16">
        // {/* <div className="container text-center relative"> */ }


        < Swiper {...params}>
            <div> FREE delivery after <strong>£100</strong> spent</div>
            <div>Slide #2</div>
            <div>Slide #3</div>
            <div>Slide #4</div>
            <div>Slide #5</div>
        </Swiper >

        // {/* </div> */ }
        // </div>


    );
}

export default Banner;