import react, { useState, useEffect } from 'react'
import { NextPage } from 'next';

import WooCommerce from './../../services/woocommerce/config_woocommerce';
import Link from 'next/link';
import Router from 'next/router'

import { useRouter } from 'next/router';
import { getCustomColor } from '../../utils/custom-colors';

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

    // console.log("filterrrrrrrr", filterOptions.colors)




    const [urlColors, setUrlColors] = useState([]);


    // const changeColor = (item) => {
    //     setUrlColors([...urlColors, item.slug])

    //     // console.log("UURUURRR", urlColors.join(","))
    // }


    useEffect(() => {
        const url = urlColors.length !== 0 ? "" : urlColors.join(",");

        Router.push({
            pathname: '/fabrics',
            query: { ...Router.query, colors: url }
        })
    }, [urlColors])

    function changeColor(item) {
        Router.push({
            pathname: '/fabrics',
            query: { ...Router.query, colors: item.slug }
        })
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
                                    onClick={() => changeColor(item)}
                                    style={{
                                        backgroundColor: `${getCustomColor(item.slug)}`, border: "1px solid #e0e0e0"
                                    }}
                                    className="h-8 w-8 rounded-full cursor-pointer"

                                >
                                </div>
                                <span className="text-xs ">{capitalize(item.slug)}</span>
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

// rainbow color