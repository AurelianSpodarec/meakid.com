import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link';

const HeaderLogo = () => {

    return (
        <div className="flex title-font items-center mb-4 md:mb-0">
            <Link href="/">
                <a title="Meakid">
                    <span>Meakid</span>
                </a>
            </Link>
        </div>
    )

};

export default HeaderLogo;