import react, { useState, useEffect } from 'react'
import { NextPage } from 'next';

import WooCommerce from './../../services/woocommerce/config_woocommerce';



const Sidebar = ({ filterOptions }) => {

    console.log("filterrrrrrrr", filterOptions)



    return (
        <div>

            <h2>Filtering</h2>

            <div>
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

// Sidebar.getInitialProps = async (ctx) => {
//     return WooCommerce.get("filter-options")
//         .then(response => ({ filterOptions: response.data }))
//         .catch(error => ({ filterOptions: error.response.data }));
// }



