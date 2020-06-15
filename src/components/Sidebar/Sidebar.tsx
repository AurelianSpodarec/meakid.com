import react, { useState, useEffect } from 'react'
import { NextPage } from 'next';

import WooCommerce from './../../services/woocommerce/config_woocommerce';
import Link from 'next/link';
import Router from 'next/router'

import { useRouter } from 'next/router';
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
                <h3>Colors</h3>
                {
                    filterOptions.colors.map((item, x) =>

                        <div key={item.slug} onClick={() => changeColor(item)} style={{ backgroundColor: `${item.slug}` }} className="h-6 w-6 rounded-full cursor-pointer">

                        </div>

                    )
                }
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

