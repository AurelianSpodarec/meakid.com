import React, { useState, useRef, useEffect } from 'react'

import Link from 'next/link';

import {
    deleteCartItem
} from './../../../lib/slices/cartSlice'

import { useDispatch, useSelector } from 'react-redux'


function BasketItem({ item }) {

    console.log(item)
    const dispatch = useDispatch()

    function removeFromCart() {
        dispatch(deleteCartItem(item.key))
    }

    let productTotalPrice = item.quantity * item.product_price ? item.product_price : 1

    return (
        <div className="max-w-sm rounded overflow-hidden ">
            {/* <Link as={`/shop/${item.product_categories[0].slug}/${item.product_slug}`} href="/shop/[productCategory]/[productSlug]"> */}
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
                            <div className="flex justify-center w-1/5">
                                <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                                    <path fill="#000000" d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                </svg>

                                <input className="mx-2 border text-center w-8" type="text" value={item.quantity} />

                                <svg className="fill-current text-gray-600 w-3" viewBox="0 0 448 512">
                                    <path fill="#000000" d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
                                </svg>
                            </div>


                            <p onClick={() => removeFromCart()}>Remove</p>
                        </a>
                        <p>Total Price: {item.currency + productTotalPrice.toFixed(2)}</p>
                        {/* <div dangerouslySetInnerHTML={{ __html: `${product.currency}${parseInt(product.price).toFixed(2)}` }}></div> */}
                    </div>

                </div>
            </a>
            {/* </Link> */}

        </div>
    )
}

export default BasketItem;