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




    // Get the old url, and replace with new url

    console.log(router.query)

    const changeColor = (clickedColor) => {

        let newQuery;
        const activeColors = router.query.colors;
        const activeColorsArray = activeColors.split(',');

        const exist = activeColorsArray.filter(color => color === clickedColor);

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
        return "ss"
    }

    return (
        <div>

            <h2>Filtering</h2>

            {/* on click this, reload the shop list */}

            <div>
                <h3 className="font-bold py-4">Style</h3>
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
                {/* <div>
                        Min Price: <input onChange={(e) => updateValue(e)} value={text} />
                    </div>
                    <div>
                        Max Price: <input onChange={updateValue} value={3} />
                    </div> */}
            </div>

            <div>
                <h3 className="font-bold py-4">Colors</h3>
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
                                                transform: rotate(49deg) ${router.query.colors.includes(item.slug) ? "scale(1, 1)" : "scale(0, 1)"};
                                            
                                            }
                                            .checkmark:after {
                                                width: 13px;
                                                border-top-right-radius: 1px;
                                                border-bottom-right-radius: 1px;
                                                top: 10px;
                                                left: 4px;
                                                transform: rotate(-49deg) ${router.query.colors.includes(item.slug) ? "scale(1, 1)" : "scale(0, 1)"} ;
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
        </div >
    )
}

export default Sidebar;