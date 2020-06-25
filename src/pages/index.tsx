import * as React from 'react'
import { NextPage } from 'next'
import { Header, Footer } from './../components/'

const IndexPage: NextPage = () => {
    return (

        <>
            <div className="relative">
                <figure className="relative">

                    <img
                        style={{ minHeight: "250px", maxHeight: "650px" }}
                        className="object-cover w-full"
                        src="https://fabricguild.co.uk/wp-content/uploads/2013/07/fabrics-large-662x450.png"
                    />

                    <figcaption className="absolute top-1/2 z-10">
                        <h3>New Adapt OMBRE SEAMLESS</h3>
                        <p>Confidence that never fades.</p>
                        <button className="bg-white hover:bg-gray-100 text-gray-800 font-semibold py-2 px-4 border border-gray-400 rounded-full shadow">SHOP</button>
                    </figcaption>


                </figure>
            </div>
        </>

    )
}

export default IndexPage