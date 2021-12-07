import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link';
import HeaderLink from './HeaderLink/HeaderLink';


const HeaderMenu = ({ openMenu }) => {

    useEffect(() => {
        let body = document.getElementsByTagName('body')[0];

        if (!openMenu) {
            body.classList.remove("overflow-y-hidden");
        } else {
            body.classList.add("overflow-y-hidden");
        }
    }, [openMenu])

    return (

        <nav style={{
            top: "80px",
            paddingBottom: "80px"
        }} className={` ${openMenu ? "translate-x-0" : "translate-x-full"} overflow-y-auto lg:hidden text-center w-full block fixed z-50 transform transition duration-500 ease-in-out md:ml-auto md:mr-auto top-0 bottom-0 bg-gray-100 left-0  items-center text-base`}>
            <div className="pt-6 px-4 mb-2">
                <div className="border-b pb-4">
                    <h3>Menu</h3>
                </div>
            </div>
            <HeaderLink
                href="/"
                title="Home Page"
                label="Home"
                className="block"
            />
            <HeaderLink
                as="/fabrics"
                href="/[category]"
                title="Fabrics"
                label="Fabrics"
            />
            <HeaderLink
                as="/fabrics"
                href="/[category]?sub_category=cotton"
                title="Cotton"
                label="cotton"
            />
            <HeaderLink
                as="/fabrics?category=fabrics&sub_category=jersey"
                href="/[category]?sub_category=jersey"
                title="Jersey"
                label="jersey"
            />
            {/* <HeaderLink
                as="/uncategorized"
                href="/[category]"
                title="Uncategorized"
                label="Uncategorized"
                className="block"
            />
            <HeaderLink
                as="/test"
                href="/[category]"
                title="test"
                label="test"
                className="block"
            /> */}
            <HeaderLink
                href="/privacy-policy"
                title="Privacy Policy"
                label="Privacy Policy"
                className="block"
            />
        </nav>

    )

};

export default HeaderMenu;
