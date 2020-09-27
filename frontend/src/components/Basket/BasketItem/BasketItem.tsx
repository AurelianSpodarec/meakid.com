import React, { useState, useRef, useEffect } from 'react'

import Link from 'next/link';

import {
    deleteCartItem,
    updateCartItem
} from './../../../lib/slices/cartSlice'

import { useDispatch, useSelector } from 'react-redux'


function BasketItem({ item }) {

    console.log(item.attributes.pa_colors && item.attributes.pa_colors)
    const dispatch = useDispatch()

    function removeFromCart() {
        dispatch(deleteCartItem(item.key))
    }

    // get the current product and update its quantity +/- 1
    function increaseQuantity() {
        dispatch(updateCartItem(item.key, 5 + 1))
    }

    return (
        <div key={item.key} className="max-w-sm rounded overflow-hidden border-b border-gray-400 mb-8 py-6">
            {/* <Link as={`/shop/${item.product_categories[0].slug}/${item.product_slug}`} href="/shop/[productCategory]/[productSlug]"> */}
            {/* <a title="Product Item"> */}
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
                        <p className="text-base mb-2">{item.product_title}</p>
                        <p>{item.attributes && item.attributes.pa_colors ? item.attributes.pa_colors : ""}</p>
                        <p>{item.attributes && item.attributes.pa_size}cm</p>
                        <p className="text-xs">{`${item.currency}${item.product_price.toFixed(2)}`} GBP</p>
                        <div className="flex mt-2 mb-1">
                            <div className="border w-8 h-8 fill-current flex transform transition duration-200 ease-in-out text-gray-600 cursor-pointer items-center justify-center hover:bg-gray-800 hover:text-gray-100">
                                -
                            </div>
                            <p className="flex items-center justify-center cursor-default border text-xs w-8 h-8 text-center">{item.quantity}</p>
                            <div className="border w-8 h-8 fill-current flex transform transition duration-200 ease-in-out text-gray-600 cursor-pointer items-center justify-center hover:bg-gray-800 hover:text-gray-100">
                                +
                                </div>
                        </div>

                        <p className="text-xs" onClick={() => removeFromCart()}>Remove</p>
                    </a>
                    {/* <p>Total Price: {item.currency + productTotalPrice.toFixed(2)}</p> */}
                    {/* <div dangerouslySetInnerHTML={{ __html: `${product.currency}${parseInt(product.price).toFixed(2)}` }}></div> */}
                </div>

            </div>
            {/* </a> */}
            {/* </Link> */}

        </div>
    )
}

export default BasketItem;