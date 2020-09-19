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


function CartItem({ item }) {
    return (
        <div>
            <img src={item.product_image} />
            <h1>{item.product_name}</h1>
            <p></p>
        </div>
    )
}

const Cart = () => {

    const dispatch = useDispatch()
    const products = useSelector(selectProducts)

    const [cartData, setCartData] = useState({})

    const getCart = async () => {
        const res = await fetch('http://localhost:8888/wp-json/cocart/v1/get-cart?thumb=true', {
            "method": "GET",
            "credentials": 'include',
            "headers": {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        }).then(res => res.json());
        setCartData(res)
    }

    const fetchCart = async () => {
        await getCart()
    }

    console.log("cartData", cartData)

    useEffect(() => {
        fetchCart()
    }, [])

    // console.log("cart", products)
    return (
        <div className="cart">
            <h1>Cart</h1>
            <div>
                {
                    products && Object.keys(cartData).map((item, index) => {
                        return <CartItem item={cartData[item]} />
                    })
                }
            </div>
        </div>
    )

};

export default Cart;