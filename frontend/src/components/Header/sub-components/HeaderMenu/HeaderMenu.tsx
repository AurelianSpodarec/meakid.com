import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link';
import HeaderLink from './HeaderLink/HeaderLink';


const HeaderMenu = () => {

    return (

        <nav className="md:ml-auto md:mr-auto fixed lg:static top-0 bottom-0 bg-gray-100 left-0 flex flex-wrap items-center text-base justify-center">
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
            />
            <HeaderLink
                href="/contact"
                title="Contact"
                label="Contact"
            />
        </nav>

    )

};

export default HeaderMenu;