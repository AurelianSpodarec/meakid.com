import react, { useState, useEffect } from 'react'
import { NextPage } from 'next';

import WooCommerce from './../../services/woocommerce/config_woocommerce';
import Link from 'next/link';
import Router from 'next/router'

import { useRouter } from 'next/router';


// if not found, just default to name
const customColors = {
    "black": "#000",
    "white": "#fff",
    "brown": "#ad8111",
    "beige": "#f0deba",
    "pink": "#fcc6de",
    "grey": "#ccc",
    "orange": "#F36B26",
    "green": "#7BBA3C",
    "red": "#E7352B"
}


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
            pathname: '/shop',
            query: { ...Router.query, colors: url }
        })
    }, [urlColors])

    function changeColor(item) {
        Router.push({
            pathname: '/shop',
            query: { ...Router.query, colors: item.slug }
        })
    }

    return (
        <div>

            <h2>Filtering</h2>

            {/* on click this, reload the shop list */}

            <div>
                <h3 className="font-bold">Colors</h3>
                <div>
                    {
                        filterOptions.colors.map((item, x) =>

                            <div className="text-center items-center flex flex-col h-24">
                                <div
                                    key={item.slug}
                                    onClick={() => changeColor(item)}
                                    style={{ backgroundColor: `${item.slug}` }}
                                    className="h-8 w-8 rounded-full cursor-pointer">
                                </div>
                                <span>{capitalize(item.slug)}</span>
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

// white, add bg gray: #e0e0e0

