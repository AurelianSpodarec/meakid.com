import * as React from 'react'
import { NextPage } from 'next'
import { Header, Footer } from './../components/'

import cxs from 'cxs';

const IndexPage: NextPage = () => {



    // const className = cxs({
    //     ':before': {
    //         left: 0,
    //         bottom: 'auto',
    //         width: '50%',
    //         height: '100%',
    //         background: "linear-gradient(to left, rgba(255,255,255,0) 35%, rgba(0,0,0,0.8) 100%)"
    //     }
    // })

    return (

        <>
            <div className="relative w-full ">
                <div
                    style={{ background: "linear-gradient(to left, rgba(255,255,255,0) 35%, rgba(0,0,0,0.3) 100%)" }}
                    className="absolute w-1/2 h-full z-10"
                ></div>

                <figure className="relative">

                    <img
                        style={{ minHeight: "250px", maxHeight: "650px" }}
                        className="object-cover w-full"
                        src="https://cdn.pixabay.com/photo/2016/11/19/08/00/towel-1838210_960_720.jpg"
                    />

                    <figcaption className="absolute top-1/2 z-10 text-gray-100 pl-12 transform -translate-y-1/2">
                        <h3 className="mb-4 leading-tight uppercase font-bold text-bold text-2xl md:text-3xl lg:text-4xl">New Adapt <br /> OMBRE SEAMLESS</h3>
                        <p className="text-sm mb-4">Confidence that never fades.</p>
                        <button className="text-xs bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-8 text-xs border border-gray-400 rounded-full shadow">SHOP</button>
                    </figcaption>


                </figure>
            </div>
        </>

    )
}

export default IndexPage