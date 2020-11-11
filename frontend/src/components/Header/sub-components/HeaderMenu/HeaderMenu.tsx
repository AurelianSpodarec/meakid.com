import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link';
import HeaderLink from './HeaderLink/HeaderLink';


const HeaderMenu = () => {

    return (

        <nav className={` hidden lg:block  md:ml-auto md:mr-auto lg:static top-0 bottom-0 left-0 flex flex-wrap items-center text-base justify-center`}>
            <HeaderLink
                href="/"
                title="Home Page"
                label="Home"
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
            />
            <HeaderLink
                as="/test"
                href="/[category]"
                title="test"
                label="test"
            /> */}
            <HeaderLink
                href="/contact"
                title="Contact"
                label="Contact"
            />
        </nav>

    )

};

export default HeaderMenu;