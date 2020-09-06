import React, { useState, useRef, useEffect } from 'react'
import { NextPage } from 'next'

import Link from 'next/link'

const Hero: NextPage = ({ title, subTitle, buttonName, image }: any) => {

    return (

        <div className="relative w-full ">
            <div
                style={{ background: "linear-gradient(to left, rgba(255,255,255,0) 35%, rgba(0,0,0,0.3) 100%)" }}
                className="absolute w-1/2 h-full z-10"
            ></div>

            <figure className="relative">

                <img
                    style={{ minHeight: "250px", maxHeight: "650px" }}
                    className="object-cover w-full"
                    src={image}
                />

                <figcaption className="absolute top-1/2 z-10 text-gray-100 pl-12 transform -translate-y-1/2">
                    <h3 className="mb-4 leading-tight uppercase font-bold text-bold text-2xl md:text-3xl lg:text-4xl">{title}</h3>
                    <p className="text-sm mb-4">{subTitle}</p>
                    <button className="text-xs md:text-base bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-8 text-xs border border-gray-400 rounded-full shadow">{buttonName}</button>
                </figcaption>


            </figure>
        </div>

    )
}

export default Hero;