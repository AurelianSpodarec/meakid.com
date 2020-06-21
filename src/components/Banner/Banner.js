import { useState, useEffect } from 'react';
import Swiper from 'swiper';
import Link from 'next/link';

function Banner({ product }) {

    return (

        <div className="h-16 bg-gray-100 overflow-hidden px-2 mb-16">

            <div>
                <div className="container text-center">
                    FREE delivery after <strong>£100</strong> spent
            </div>
            </div>

        </div>


    );
}

export default Banner;