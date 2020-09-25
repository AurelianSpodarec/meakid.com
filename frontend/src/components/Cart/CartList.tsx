import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link';

import { useDispatch, useSelector } from 'react-redux'

import {
    selectProducts,

} from '../../lib/slices/cartSlice'

import CartItem from './CartItem';


const CartList = () => {

    const dispatch = useDispatch()
    const products = useSelector(selectProducts)

    return (
        <div className="">
            <div className="flex justify-between mb-5">
                <h3>SHOPPING CART</h3>
            </div>


            <table className="table-auto w-full">
                <thead className="bg-gray-400 w-100">
                    <tr>
                        <th className="text-left" colSpan="2">Item</th>
                        <th>Quantity</th>
                        <th>Subtotal</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        products && products.map((item, index) => {
                            return <CartItem item={item} />
                        })
                    }

                </tbody>
            </table>

            <div>

            </div>

            <div className="">
                <Link href="/checkout">
                    <button className="mb-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Checkout</button>
                </Link>
            </div>
        </div>
    )

};

export default CartList;