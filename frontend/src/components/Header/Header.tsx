import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link';
import HeaderMenu from './sub-components/HeaderMenu/HeaderMenu';
import HeaderLogo from './sub-components/HeaderLogo/HeaderLogo';
import Basket from '../Basket/Basket';

import {
    openCart,
    closeCart,
    cartOpenState
} from './../../lib/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux'




const Header = () => {

    const dispatch = useDispatch()

    const open = useSelector(cartOpenState)

    function toggleCart() {
        if (open) {
            dispatch(closeCart())
        } else {
            dispatch(openCart())
        }
    }

    useEffect(() => {
        let body = document.getElementsByTagName('body')[0];

        if (!open) {
            dispatch(closeCart())
            body.classList.remove("overflow-hidden");
            let el = document.getElementById("1")
            if (!el) return
            requestAnimationFrame(function () {
                el.classList.remove("bg-opacity-50");
            });
            setTimeout(function () {
                el.remove()
            }, 1000)
        } else {
            let shade = document.createElement('div');
            shade.id = "1"
            shade.classList.add("fixed", "bg-gray-900", "bg-opacity-0", "z-30", "top-0", "right-0", "left-0", "bottom-0", "h-full", "ease-in-out", "transition", "duration-300");
            requestAnimationFrame(function () {
                shade.classList.add("bg-opacity-50");
            });
            document.body.appendChild(shade)
            body.classList.add("overflow-hidden");
        }
    }, [open])

    return (
        <>
            <header className={`fixed z-20 left-0 right-0 top-0 bg-white border-solid border-1 border-b border-gray-300 w-full`}>
                <div className="mx-auto flex flex-wrap p-5 flex-row items-center">

                    <HeaderLogo />

                    <HeaderMenu />

                    <div className="inline-flex items-center  border-0 py-1 px-3 text-base mt-4 md:mt-0">
                        <div className="cursor-pointer px-3">
                            <svg className="h-full w-full" height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" ></path></svg>
                        </div>

                        <div className="cursor-pointer hidden lg:block  px-3">
                            <svg className="h-full w-full" height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" role="presentation" viewBox="0 0 100 100"><path d="M85.355 64.645c-5.445-5.446-11.927-9.478-19-11.918 7.575-5.217 12.551-13.948 12.551-23.82C78.906 12.966 65.94 0 50 0 34.061 0 21.094 12.967 21.094 28.906c0 9.873 4.976 18.604 12.55 23.821-7.071 2.44-13.553 6.472-19 11.918C5.202 74.088 0 86.645 0 100h7.813c0-23.262 18.925-42.188 42.187-42.188 23.262 0 42.188 18.926 42.188 42.188H100c0-13.355-5.201-25.912-14.645-35.355zM50 50c-11.631 0-21.094-9.462-21.094-21.094C28.906 17.275 38.37 7.813 50 7.813c11.631 0 21.094 9.462 21.094 21.093C71.094 40.538 61.63 50 50 50z" fill="#000" fillRule="nonzero"></path></svg>
                        </div>

                        <div onClick={toggleCart} className="flex relative cursor-pointer cursor-pointer px-3  text-center  align-middle ">
                            <span className="absolute rounded-full text-xs right-0 top-50 bottom-0 left-50 z-10    h-5 w-5 border-radius  text-center  align-middle text-white">4</span>
                            <svg className="relative h-full w-full z-5" height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="shopping-bag" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"  ><path fill="currentColor" d="M352 160v-32C352 57.42 294.579 0 224 0 153.42 0 96 57.42 96 128v32H0v272c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V160h-96zm-192-32c0-35.29 28.71-64 64-64s64 28.71 64 64v32H160v-32zm160 120c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zm-192 0c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24z"  ></path></svg>
                        </div>

                        <button className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-800  focus:outline-none   transition duration-150 ease-in-out" aria-label="Main menu" aria-expanded="false">
                            <svg className="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>

                </div>
            </header>

            <Basket />
        </>
    )

};

export default Header;