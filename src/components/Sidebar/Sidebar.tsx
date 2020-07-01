import react, { useState, useEffect } from 'react'
import { NextPage } from 'next';

import WooCommerce from './../../services/woocommerce/config_woocommerce';
import Link from 'next/link';
import Router from 'next/router'

import { useRouter } from 'next/router';
import { getCustomColor } from '../../utils/custom-colors';
// import cxs from 'cxs';

import styles from './Sidebar.module.css';

// if not found, just default to name

// rainbow color
// #grad1 {
//     height: 50px;
//     width: 50px;
//     background-color: red; /* For browsers that do not support gradients */
//     background-image: linear-gradient(red, orange, yellow, green, blue, indigo, violet); /* Standard syntax (must be last) */
//     border-radius: 50%;
//     transform: rotate(45deg);

//   } 

const capitalize = (s) => {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1)
}


const Sidebar = ({ filterOptions }) => {



    console.log("filterrrrrrrr", filterOptions.colors)

    const router = useRouter()


    const [urlColors, setUrlColors] = useState([]);

    const [selectedColorsNumber, setSelectedColorsNumber] = useState("");

    useEffect(() => {
        if (router.query.colors) {
            const activeColors = router.query.colors;
            const activeColorsArray = activeColors ? activeColors.split(',') : false;

            setSelectedColorsNumber(activeColorsArray.length)
        }
    }, [router.query.colors])
    // Get the old url, and replace with new url

    console.log(router.query)

    const changeColor = (clickedColor) => {

        let newQuery;


        // If colors empty, create colors with the new value
        // If there are no colors, error check that so it doesn't return the colors

        const activeColors = router.query.colors;


        const activeColorsArray = activeColors ? activeColors.split(',') : false;

        const exist = activeColors ? activeColorsArray.filter(color => color === clickedColor) : false;


        if (exist.length === 0) {
            const b = [...activeColorsArray, clickedColor]
            newQuery = b.join(",")
            Router.push({
                pathname: '/fabrics',
                query: { ...Router.query, colors: newQuery }
            })
        } else if (exist) {
            const newActiveColorsArray = activeColorsArray.filter(colors => colors !== clickedColor)
            newQuery = newActiveColorsArray.join(',')

            Router.push({
                pathname: '/fabrics',
                query: { ...Router.query, colors: newQuery }
            })
        } else {
            Router.push({
                pathname: '/fabrics',
                query: { ...Router.query }
            })
        }

    }


    if (!filterOptions) {
        return "ss";
    }

    return (
        <div className="pt-24 lg:pt-0">
            <div className="relative">
                <div className="absolute flex right-0 top-0 bg-gray-900 rounded-full h-8 w-8 text-white justify-center items-center lg:hidden">
                    <span className="font-bold text-xl">x</span>
                </div>

                <div>
                    <h2>Filtering</h2>

                    {/* on click this, reload the shop list */}

                    <div>
                        <h3 className="py-4">Style</h3>
                        <div className="flex flex-wrap py-2 ">

                            <div className="md:flex md:items-center mb-6">
                                <div className=""></div>
                                <label className="block text-gray-500 font-bold">
                                    <input className="mr-2 leading-tight" type="checkbox" />
                                    <span className="text-sm">
                                        Plain Cotton
                                    </span>
                                </label>
                            </div>
                            <div className="md:flex md:items-center mb-6">
                                <div className=""></div>
                                <label className="block text-gray-500 font-bold">
                                    <input className="mr-2 leading-tight" type="checkbox" />
                                    <span className="text-sm">
                                        Printed Cotton
                            </span>
                                </label>
                            </div>

                        </div>

                    </div>

                    <div>
                        <h3 className="py-4">Colors {selectedColorsNumber !== "" ? `(${selectedColorsNumber})` : ""}</h3>

                        <div className="flex flex-wrap py-2 ">
                            {
                                filterOptions.colors.map((item, x) =>

                                    <div className="w-1/3 cursor-pointer text-center items-center flex flex-col h-16 text-gray-800 hover:text-gray-600">
                                        <div
                                            key={item.slug}
                                            onClick={() => changeColor(item.slug)}
                                            style={{
                                                backgroundColor: `${getCustomColor(item.slug)}`, border: "1px solid #e0e0e0"
                                            }}
                                            className="h-8 w-8 relative rounded-full cursor-pointer"

                                        >
                                            <div className="checkmark">
                                                <style jsx>{` 
                                            .checkmark {
                                                display: inline-block;
                                                color: rgb(255, 255, 255);
                                                position: absolute;
                                                top: 50%;
                                                left: 50%;
                                                right: unset;
                                                transform: translate3d(-50%, -50%, 0px);
                                                height: 13px;
                                                width: 13px;
                                            }
                                            .checkmark:before,
                                            .checkmark:after {
                                                content: "";
                                                height: 2px;
                                                background-color: ${item.slug === "white" ? 'black' : 'white'};
                                                display: block;
                                                position: absolute;
                                                transform-origin: left center;
                                            }
                                            .checkmark:before {
                                                width: 6px;
                                                border-top-left-radius: 1px;
                                                border-bottom-left-radius: 1px;
                                                top: 5px;
                                                left: 1px;
                                                transform: rotate(49deg) ${router.query.colors && router.query.colors.includes(item.slug) ? "scale(1, 1)" : "scale(0, 1)"};
                                            
                                            }
                                            .checkmark:after {
                                                width: 13px;
                                                border-top-right-radius: 1px;
                                                border-bottom-right-radius: 1px;
                                                top: 10px;
                                                left: 4px;
                                                transform: rotate(-49deg) ${router.query.colors && router.query.colors.includes(item.slug) ? "scale(1, 1)" : "scale(0, 1)"} ;
                                            }       
                                        `}</style>
                                            </div>
                                        </div>
                                        {/* if exist, mark */}
                                        {/* {console.log(router.query)} */}
                                        {/* 
                                {router.query.colors.includes(item.slug) ? "YES" : "no"} */}
                                        <span className="text-xs">{capitalize(item.slug)}</span>
                                    </div>
                                )
                            }
                        </div>
                        {/* <div>
                        Min Price: <input onChange={(e) => updateValue(e)} value={text} />
                    </div>
                    <div>
                        Max Price: <input onChange={updateValue} value={3} />
                    </div> */}
                    </div>
                </div>

                <div className="bg-white border-solid border-t-2 border-gray-300 py-4 px-8 lg:hidden">
                    <button className="bg-gray-900 px-12 w-full rounded-full py-2 text-white">Apply</button>
                </div>
            </div>
        </div >
    )
}

export default Sidebar;