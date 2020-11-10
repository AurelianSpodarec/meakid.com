import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link';

const HeaderLogo = () => {

    return (
        <div className="sm:p-0 p-2 title-font items-center sm:mb-4 md:mb-0">
            <Link href="/">
                <a title="Meakid">
                    <span style={{
                        fontWeight: "bold",
                        fontSize: "20px"
                    }}>Meakid</span>
                </a>
            </Link>
        </div>
    )

};

export default HeaderLogo;