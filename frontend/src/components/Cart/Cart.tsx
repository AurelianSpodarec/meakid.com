import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link';

import CartItem from './CartItem/CartItem';

import { useDispatch, useSelector } from 'react-redux'

import {
    // addItemToCart,
    // removeItemFromCart,
    // increaseItemQuantity,
    // decreaseItemQuantity,
    // clearCart,
    // loadCard,
    selectProducts
} from './../../lib/slices/cartSlice'



const Cart = () => {

    const dispatch = useDispatch()
    const products = useSelector(selectProducts)


    return (
        <div className="transform transition duration-500 ease-in-out  p-5 min-h-screen fixed overflow-auto z-30 inset-y-0 bottom-0 right-0 bg-white w-full md:w-106">
            <div className="flex justify-between mb-5">
                <h3>Your Cart</h3>
                {/* <div onClick={closeCart}>X</div> */}
            </div>
            <div>
                {
                    products && products.map((item, index) => {
                        return <CartItem item={item} />
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

export default Cart;