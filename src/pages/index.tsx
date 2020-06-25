import * as React from 'react'
import { NextPage } from 'next'
import { Header, Footer } from './../components/'

const IndexPage: NextPage = () => {
    return (

        <>

            <figure>

                <img
                    style={{ minHeight: "250px", maxHeight: "650px" }}
                    className="object-cover w-full"
                    src="https://fabricguild.co.uk/wp-content/uploads/2013/07/fabrics-large-662x450.png"
                />

                <figcaption>
                    <h3>New Adapt OMBRE SEAMLESS</h3>
                    <p>Confidence that never fades.</p>


                    <button>SHOP</button>
                </figcaption>


            </figure>
        </>

    )
}

export default IndexPage