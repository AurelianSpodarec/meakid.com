import React, { useState, useRef, useEffect } from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { withRouter, useRouter } from 'next/router'


import { connect } from 'react-redux';
import { compose } from 'redux';
import { removeFromCart, openCart, closeCart } from '../../store/cart/cart.actions';
import ShoppingCart from './../ShoppingCart/ShoppingCart';

// Hook
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
        // Add ref and handler to effect dependencies
        // It's worth noting that because passed in handler is a new ...
        // ... function on every render that will cause this effect ...
        // ... callback/cleanup to run every render. It's not a big deal ...
        // ... but to optimize you can wrap handler in useCallback before ...
        // ... passing it into this hook.
        [ref, handler]
    );
}

const Header: NextPage = ({ cart, openCart, closeCart, removeFromCart }: any) => {
    // console.log(cart.open)
    const ref = useRef();
    const router = useRouter();

    const [open, setOpen] = useState(false);

    useOnClickOutside(ref, () => setOpen(false));

    const openSidebar = () => {
        setOpen(true)
    }

    function toggleCart() {
        if (cart.open) {
            closeCart()
        }
        openCart()
    }

    useEffect(() => {
        if (!open) {
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
        }
    }, [open])

    return (

        <>

            <header className="fixed z-20 left-0 right-0 top-0 bg-white border-solid border-1 border-b border-gray-300 w-full">

                <div className="pl-2 md:pl-12 pr-2 md:pr-4 align-middle flex justify-between h-16">

                    <div className="flex items-center h-full cursor-pointer">
                        <Link href="/">
                            <img style={{ maxWidth: "60px", padding: "8px" }} src="https://i.imgur.com/aCuOZKn.png" />
                            {/* <span>Meakid</span> */}
                        </Link>
                    </div>


                    {
                        router.route !== "/checkout" &&

                        <>
                            <nav className="hidden lg:block sm:ml-6">
                                <ul className="flex h-full items-center">

                                    <Link href="/">
                                        <a href="#" className={` hover:border-b hover:border-solid hover:border-gray-900 py-4 h-full flex items-center uppercase ml-4 px-3 py-2 text-xs font-normal leading-5 text-bold text-gray-900 focus:outline-none transition duration-150 ease-in-out`}>
                                            Home
                                </a>
                                    </Link>
                                    <Link href="/about">
                                        <a href="#" className={` hover:border-b hover:border-solid hover:border-gray-900 py-4 h-full flex items-center uppercase ml-4 px-3 py-2 text-xs font-normal leading-5 text-bold text-gray-900 focus:outline-none transition duration-150 ease-in-out`}>
                                            About Us
                                </a>
                                    </Link>
                                    <Link href="/fabrics">
                                        <a href="#" className={` hover:border-b hover:border-solid hover:border-gray-900 py-4 h-full flex items-center uppercase ml-4 px-3 py-2 text-xs font-normal leading-5 text-bold text-gray-900 focus:outline-none transition duration-150 ease-in-out`}>
                                            Fabrics
                                </a>
                                    </Link>
                                </ul>
                            </nav>

                            <div className="flex  align-middle">
                                <div className="cursor-pointer px-3">
                                    {/* <svg className="h-full w-full" height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M508.5 481.6l-129-129c-2.3-2.3-5.3-3.5-8.5-3.5h-10.3C395 312 416 262.5 416 208 416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c54.5 0 104-21 141.1-55.2V371c0 3.2 1.3 6.2 3.5 8.5l129 129c4.7 4.7 12.3 4.7 17 0l9.9-9.9c4.7-4.7 4.7-12.3 0-17zM208 384c-97.3 0-176-78.7-176-176S110.7 32 208 32s176 78.7 176 176-78.7 176-176 176z"></path></svg> */}
                                    <svg className="h-full w-full" height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M505 442.7L405.3 343c-4.5-4.5-10.6-7-17-7H372c27.6-35.3 44-79.7 44-128C416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c48.3 0 92.7-16.4 128-44v16.3c0 6.4 2.5 12.5 7 17l99.7 99.7c9.4 9.4 24.6 9.4 33.9 0l28.3-28.3c9.4-9.4 9.4-24.6.1-34zM208 336c-70.7 0-128-57.2-128-128 0-70.7 57.2-128 128-128 70.7 0 128 57.2 128 128 0 70.7-57.2 128-128 128z" ></path></svg>
                                </div>

                                <div className="cursor-pointer hidden lg:block  px-3">
                                    <svg className="h-full w-full" height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" role="presentation" viewBox="0 0 100 100"><path d="M85.355 64.645c-5.445-5.446-11.927-9.478-19-11.918 7.575-5.217 12.551-13.948 12.551-23.82C78.906 12.966 65.94 0 50 0 34.061 0 21.094 12.967 21.094 28.906c0 9.873 4.976 18.604 12.55 23.821-7.071 2.44-13.553 6.472-19 11.918C5.202 74.088 0 86.645 0 100h7.813c0-23.262 18.925-42.188 42.187-42.188 23.262 0 42.188 18.926 42.188 42.188H100c0-13.355-5.201-25.912-14.645-35.355zM50 50c-11.631 0-21.094-9.462-21.094-21.094C28.906 17.275 38.37 7.813 50 7.813c11.631 0 21.094 9.462 21.094 21.093C71.094 40.538 61.63 50 50 50z" fill="#000" fillRule="nonzero"></path></svg>
                                </div>

                                <div onClick={toggleCart} className="flex relative cursor-pointer cursor-pointer px-3  text-center  align-middle ">
                                    {/* <span className="absolute rounded-full text-xs right-0 top-0 bg-black z-10 border-rounded align-middle h-5 w-5 border-radius  text-center  align-middle   text-white">4</span> */}
                                    {/* <svg className="relative h-full w-full" height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" data-prefix="far" data-icon="shopping-cart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z" ></path></svg> */}
                                    {/* <svg className="relative h-full w-full" height="20" width="20" viewBox="0 0 20 20" ria-hidden="true" focusable="false" data-prefix="fas" data-icon="shopping-cart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"  ></path></svg> */}

                                    <span className="absolute rounded-full text-xs right-0 top-50 bottom-0 left-50 z-10    h-5 w-5 border-radius  text-center  align-middle text-white">4</span>
                                    <svg className="relative h-full w-full z-5" height="20" width="20" viewBox="0 0 20 20" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="shopping-bag" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"  ><path fill="currentColor" d="M352 160v-32C352 57.42 294.579 0 224 0 153.42 0 96 57.42 96 128v32H0v272c0 44.183 35.817 80 80 80h288c44.183 0 80-35.817 80-80V160h-96zm-192-32c0-35.29 28.71-64 64-64s64 28.71 64 64v32H160v-32zm160 120c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24zm-192 0c-13.255 0-24-10.745-24-24s10.745-24 24-24 24 10.745 24 24-10.745 24-24 24z"  ></path></svg>
                                </div>

                                <button onClick={openSidebar} className="lg:hidden inline-flex items-center justify-center p-2 rounded-md text-gray-800  focus:outline-none   transition duration-150 ease-in-out" aria-label="Main menu" aria-expanded="false">
                                    <svg className="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </>
                    }


                </div>

            </header>


            <div ref={ref} className={`${open ? "translate-x-0" : "translate-x-full"} transform transition duration-500 ease-in-out fixed w-68 bg-white right-0 top-0 bottom-0 z-40`}>
                <ul className="flex flex-col divide-y divide-gray-400">

                    <Link href="/">
                        <a href="#" className={` bg-gray-100 py-4 h-full  flex  items-center uppercase px-3 py-2 text-xs font-normal leading-5 text-bold text-gray-900 focus:outline-none transition duration-150 ease-in-out`}>
                            Home
                        </a>
                    </Link>
                    <Link href="/about">
                        <a href="#" className={` bg-gray-100 py-4 h-full  flex  items-center uppercase px-3 py-2 text-xs font-normal leading-5 text-bold text-gray-900 focus:outline-none transition duration-150 ease-in-out`}>
                            About Us
                        </a>
                    </Link>
                    <Link href="/fabrics">
                        <a href="#" className={` bg-gray-100 py-4 h-full  flex  items-center uppercase px-3 py-2 text-xs font-normal leading-5 text-bold text-gray-900 focus:outline-none transition duration-150 ease-in-out`}>
                            Fabrics
                        </a>
                    </Link>
                </ul>
            </div>

            <ShoppingCart />


        </>

    )
}

// export default withRouter(Header)


const mapDispatchToProps = {
    openCart,
    closeCart
}

const mapStateToProps = state => {
    return {
        cart: state.cart
    }
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Header);