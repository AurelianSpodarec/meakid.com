import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link';

const HeaderLink = ({ href, as, label, title, className }: any) => {

    return (
        <Link as={as} href={href}>
            <a title={title} className={className}>
                <span className="block lg:inline py-4 hover:border-b hover:border-solid hover:border-gray-900 uppercase lg:ml-4 lg:px-3 lg:py-2 text-xs font-normal leading-5 text-bold text-gray-900 focus:outline-none transition duration-150 ease-in-out">
                    {label}
                </span>
            </a>
        </Link>
    )

};

export default HeaderLink;