import react, { useState, useEffect } from 'react'
import { NextPage } from 'next';

import WooCommerce from './../../services/woocommerce/config_woocommerce';



const Sidebar = ({ filterOptions }) => {

    console.log("filterrrrrrrr", filterOptions.colors)



    return (
        <div>

            <h2>Filtering</h2>

            <div>
                <h3>Colors</h3>
                {
                    filterOptions.colors.map((item, x) =>

                        <div style={{ backgroundColor: `${item.slug}` }} className="h-5 w-5 cursor-pointer">

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

