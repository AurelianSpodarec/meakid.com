import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link';

const Footer = () => {
    const now = new Date();

    return (
        <footer className="">
            <div className="bg-gray-100 flex flex-wrap flex-col sm:flex-row px-5 py-2">
                <div className="text-xs sm:text-left">
                    <p>&copy; <span className="bold">Meakid LCD</span> | All Rights Reserved</p>
                </div>
                <span className="inline-flex sm:ml-auto sm:mt-0 mt-2 justify-center sm:justify-start">
                    <Link href="https://www.facebook.com/MeaKid-Fabrics-1011639912249174">
                        <a target="_blank" rel="noreferrer" className="text-gray-500"><svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path></svg></a>
                    </Link>
                    <Link href="https://www.instagram.com/meakidfabrics/?hl=pl">
                        <a target="_blank" rel="noreferrer" className="ml-3 text-gray-500"><svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01"></path></svg></a>
                    </Link>
                </span>
            </div>
        </footer>
    )

};

export default Footer;