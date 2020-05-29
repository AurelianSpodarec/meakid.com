import * as React from 'react'
import { NextPage } from 'next'
import Link from 'next/link'
import { withRouter } from 'next/router'


const Header: NextPage = ({ router }: any) => {
    console.log(router.pathname.startsWith('/contact'))
    return (

        <>

            <nav className="fixed left-0 right-0 top-0 bg-white border-solid border-1 border-b border-gray-300">

                <div className="pl-12 pr-8 align-middle flex justify-between">

                    <div className="inset-y-0 left-0 flex items-center sm:hidden">

                        <button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white transition duration-150 ease-in-out" aria-label="Main menu" aria-expanded="false">

                            <svg className="block h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>

                            <svg className="hidden h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    <div className="py-4 ">
                        <Link href="/">
                            <a href="#" className="text-xl">Meakid</a>
                        </Link>
                    </div>

                    <div className="hidden sm:block sm:ml-6">
                        <div className="flex">

                            <Link href="/">
                                <a href="#" className={`${router.pathname === '/about' ? "border-b border-solid border-gray-800 " : ""} py-4  uppercase ml-4 px-3 py-2 text-xs font-normal leading-5 text-gray-700 focus:outline-none transition duration-150 ease-in-out`}>Home</a>
                            </Link>
                            <Link href="/about">
                                <a href="#" className={`${router.pathname === '/about' ? "border-b border-solid border-gray-800 " : ""} py-4  uppercase ml-4 px-3 py-2 text-xs font-normal leading-5 text-gray-700 focus:outline-none transition duration-150 ease-in-out`}>About Us</a>
                            </Link>
                            <Link href="/shop">
                                <a href="#" className={`${router.pathname === '/shop' ? "border-b border-solid border-gray-800 " : ""} py-4  uppercase ml-4 px-3 py-2 text-xs font-normal leading-5 text-gray-700 focus:outline-none transition duration-150 ease-in-out`}>Shop</a>
                            </Link>
                            <Link href="/contact">
                                <a href="#" className={`${router.pathname === '/contact' ? "border-b border-solid border-gray-800 " : ""} py-4 uppercase ml-4 px-3 py-2 text-xs font-normal leading-5 text-gray-700 focus:outline-none transition duration-150 ease-in-out`}>Contact Us</a>
                            </Link>
                        </div>
                    </div>

                    <div className="flex ">

                        {/* Search */}
                        {/* Account - login/register */}
                        {/* Shopping Cart */}
                        <div className="cursor-pointer  py-4">
                            <svg height="25" width="25" viewBox="0 0 25 25" aria-hidden="true" focusable="false" data-prefix="fal" data-icon="search" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="currentColor" d="M508.5 481.6l-129-129c-2.3-2.3-5.3-3.5-8.5-3.5h-10.3C395 312 416 262.5 416 208 416 93.1 322.9 0 208 0S0 93.1 0 208s93.1 208 208 208c54.5 0 104-21 141.1-55.2V371c0 3.2 1.3 6.2 3.5 8.5l129 129c4.7 4.7 12.3 4.7 17 0l9.9-9.9c4.7-4.7 4.7-12.3 0-17zM208 384c-97.3 0-176-78.7-176-176S110.7 32 208 32s176 78.7 176 176-78.7 176-176 176z"></path></svg>
                        </div>
                        <div className="cursor-pointer  py-4">
                            <svg height="25" width="25" viewBox="0 0 25 25" aria-hidden="true" focusable="false" role="presentation" viewBox="0 0 100 100"><path d="M85.355 64.645c-5.445-5.446-11.927-9.478-19-11.918 7.575-5.217 12.551-13.948 12.551-23.82C78.906 12.966 65.94 0 50 0 34.061 0 21.094 12.967 21.094 28.906c0 9.873 4.976 18.604 12.55 23.821-7.071 2.44-13.553 6.472-19 11.918C5.202 74.088 0 86.645 0 100h7.813c0-23.262 18.925-42.188 42.187-42.188 23.262 0 42.188 18.926 42.188 42.188H100c0-13.355-5.201-25.912-14.645-35.355zM50 50c-11.631 0-21.094-9.462-21.094-21.094C28.906 17.275 38.37 7.813 50 7.813c11.631 0 21.094 9.462 21.094 21.093C71.094 40.538 61.63 50 50 50z" fill="#000" fillRule="nonzero"></path></svg>
                        </div>
                        <div className="flex relative cursor-pointer py-4">

                            <span className="absolute right-0 top-0 bg-black z-10 border-rounded align-middle h-5 w-5 border-radius radius-50 text-center  align-middle text-sm text-white">4</span>

                            <svg className="relative" height="25" width="25" viewBox="0 0 25 25" aria-hidden="true" focusable="false" data-prefix="far" data-icon="shopping-cart" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M551.991 64H144.28l-8.726-44.608C133.35 8.128 123.478 0 112 0H12C5.373 0 0 5.373 0 12v24c0 6.627 5.373 12 12 12h80.24l69.594 355.701C150.796 415.201 144 430.802 144 448c0 35.346 28.654 64 64 64s64-28.654 64-64a63.681 63.681 0 0 0-8.583-32h145.167a63.681 63.681 0 0 0-8.583 32c0 35.346 28.654 64 64 64 35.346 0 64-28.654 64-64 0-18.136-7.556-34.496-19.676-46.142l1.035-4.757c3.254-14.96-8.142-29.101-23.452-29.101H203.76l-9.39-48h312.405c11.29 0 21.054-7.869 23.452-18.902l45.216-208C578.695 78.139 567.299 64 551.991 64zM208 472c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm256 0c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm23.438-200H184.98l-31.31-160h368.548l-34.78 160z" ></path></svg>
                        </div>
                    </div>
                </div>


                {/* 
                <div>
                    Filter

                    Min: <input />
                </div> */}



            </nav>



        </>

    )
}

export default withRouter(Header)