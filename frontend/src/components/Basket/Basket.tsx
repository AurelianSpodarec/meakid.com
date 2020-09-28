import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link';

import BasketItem from './BasketItem/BasketItem';

import { useDispatch, useSelector } from 'react-redux'

import {
    closeCart,
    selectProducts,
    cartOpenState,
    selectTotalPrice
} from '../../lib/slices/cartSlice'


function useOnClickOutside(ref, handler) {
    useEffect(
        () => {
            const listener = event => {
                // Do nothing if clicking ref's element or descendent elements
                if (!ref.current || ref.current.contains(event.target)) {
                    return;
                }

                handler(event);
            };

            document.addEventListener('mousedown', listener);
            document.addEventListener('touchstart', listener);

            return () => {
                document.removeEventListener('mousedown', listener);
                document.removeEventListener('touchstart', listener);
            };
        },
        [ref, handler]
    );
}

const Basket = () => {

    const ref = useRef();
    useOnClickOutside(ref, () => dispatch(closeCart()));

    const dispatch = useDispatch()
    const products = useSelector(selectProducts)
    const totalPrice = useSelector(selectTotalPrice)

    const open = useSelector(cartOpenState)

    console.log("basket total price", totalPrice)
    return (
        <div ref={ref} className={`${open ? "translate-x-0" : "translate-x-full"} overflow-y-hidden transform transition duration-500 ease-in-out min-h-screen fixed overflow-auto z-50 inset-y-0 bottom-0 right-0 bg-white w-full md:w-106`}>

            <div className="flex justify-between h-16 px-5 absolute top-0  bg-white left-2 right-2 w-full">
                <div className="flex items-center justify-between  border-b border-gray-400 w-full">
                    <div></div>
                    <h3 className="uppercase text-xs">Your Cart</h3>
                    <div className="text-xs" onClick={() => dispatch(closeCart())}>
                        <svg className="h-6" viewBox="0 0 320 512">
                            <path fill="currentColor" d="M193.94 256L296.5 153.44l21.15-21.15c3.12-3.12 3.12-8.19 0-11.31l-22.63-22.63c-3.12-3.12-8.19-3.12-11.31 0L160 222.06 36.29 98.34c-3.12-3.12-8.19-3.12-11.31 0L2.34 120.97c-3.12 3.12-3.12 8.19 0 11.31L126.06 256 2.34 379.71c-3.12 3.12-3.12 8.19 0 11.31l22.63 22.63c3.12 3.12 8.19 3.12 11.31 0L160 289.94 262.56 392.5l21.15 21.15c3.12 3.12 8.19 3.12 11.31 0l22.63-22.63c3.12-3.12 3.12-8.19 0-11.31L193.94 256z"></path>
                        </svg>
                    </div>
                </div>
            </div>

            <div className="px-5 overflow-y-auto h-full mt-20">
                <div>
                    {
                        products && products.map((item, index) => {
                            return <BasketItem item={item} />
                        })
                    }
                </div>

                <div>
                    <div className="flex justify-between border-b pb-4 mb-8">
                        <p className="text-sm font-bold uppercase">Total</p>
                        <p className="font-bold">£{totalPrice}</p>
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

            </div>


        </div >
    )

};

export default Basket;