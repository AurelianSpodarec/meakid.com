import React, { useState, useRef, useEffect } from 'react'

import Link from 'next/link';

import {
    fetchCartItemById,
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