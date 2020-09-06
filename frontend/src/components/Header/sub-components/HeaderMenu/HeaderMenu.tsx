import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link';
import HeaderLink from './HeaderLink/HeaderLink';


const HeaderMenu = () => {

    return (

        <nav className="md:ml-auto md:mr-auto flex flex-wrap items-center text-base justify-center">
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
                href="/contact"
                title="Contact"
                label="Contact"
            />
        </nav>

    )

};

export default HeaderMenu;