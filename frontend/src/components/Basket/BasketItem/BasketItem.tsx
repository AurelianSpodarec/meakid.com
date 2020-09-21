import React, { useState, useRef, useEffect } from 'react'

import Link from 'next/link';


function BasketItem({ item }) {

    // async function removeFromCart() {
    //     const res = await fetch(`http://localhost:8888/wp-json/cocart/v1/item?cart_item_key=${item.key}`, {
    //         "method": "DELETE",
    //         "credentials": 'include',
    //         "headers": {
    //             'Content-Type': 'application/json',
    //             'Accept': 'application/json'
    //         },

    //     }).then(res => res.json()).then(mess => console.log("!!!!", mess))
    // }
    let productTotalPrice = item.quantity * item.product_price ? item.product_price : 1

    return (
        <div className="max-w-sm rounded overflow-hidden ">
            <Link as={`/shop/${item.product_categories[0].slug}/${item.product_slug}`} href="/shop/[productCategory]/[productSlug]">
                <a title="Product Item">
                    <div className="flex flex-row">
                        <img
                            className="object-cover mr-5"
                            style={{ height: '120px' }}
                            src={item.product_image}
                            title="Contemplative Reptile"
                            alt="Sunset in the mountains"
                        />

                        <div className="text-left">
                            <a>
                                <p>{item.product_name}</p>
                                {/* <p>{`${item.currency}${item.product_price.toFixed(2)}`}</p> */}
                            Quantity
                            <input value={item.quantity} />

                                <p onClick={() => removeFromCart()}>Remove</p>
                            </a>
                            <p>Total Price: {item.currency + productTotalPrice.toFixed(2)}</p>
                            {/* <div dangerouslySetInnerHTML={{ __html: `${product.currency}${parseInt(product.price).toFixed(2)}` }}></div> */}
                        </div>

                    </div>
                </a>
            </Link>

        </div>
    )
}

export default BasketItem;