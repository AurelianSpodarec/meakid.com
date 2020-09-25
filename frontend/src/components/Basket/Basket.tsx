import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link';

import BasketItem from './BasketItem/BasketItem';

import { useDispatch, useSelector } from 'react-redux'

import {
    // addItemToCart,
    // removeItemFromCart,
    // increaseItemQuantity,
    // decreaseItemQuantity,
    // clearCart,
    // loadCard,
    selectProducts,
    cartOpenState
} from '../../lib/slices/cartSlice'



const Basket = ({ ref }) => {

    const dispatch = useDispatch()
    const products = useSelector(selectProducts)
    const open = useSelector(cartOpenState)

    return (
        <div ref={ref} className={`${open ? "translate-x-0" : "translate-x-full"} transform transition duration-500 ease-in-out  p-5 min-h-screen fixed overflow-auto z-50 inset-y-0 bottom-0 right-0 bg-white w-full md:w-106`}>
            <div className="flex justify-between mb-5">
                <h3>Your Basket</h3>
                {/* <div onClick={closeCart}>X</div> */}
            </div>
            <div>
                {
                    products && products.map((item, index) => {
                        return <BasketItem item={item} />
                    })
                }
            </div>
            <div className="flex justify-between">
                <p className="text-uppercase">Total</p>
                <p className="font-bold">£15.00</p>
            </div>

            <div className="">
                <Link href="/checkout">
                    <button className="mb-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Checkout</button>
                </Link>
                <Link href="/cart">
                    <button className="mb-2 w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full">
                        Your Cart
                    </button>
                </Link>
            </div>
        </div>
    )

};

export default Basket;