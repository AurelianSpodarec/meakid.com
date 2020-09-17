import React, { useState, useRef, useEffect } from 'react'

import Link from 'next/link';

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
    const productsUI = useSelector(selectProducts)

    // console.log("cart", productsUI)
    return (
        <div className="cart">

        </div>
    )

};

export default Cart;