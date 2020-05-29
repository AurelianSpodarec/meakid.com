import react, { useState, useEffect } from 'react'
import { NextPage } from 'next'
// import usePaginatedQuery from 'react-query'

import WooCommerce from './../services/woocommerce/config_woocommerce';
import ProducItem from '../components/ProductItem';

import Router from 'next/router'


function Pagination({ pages }) {
    console.log("paginatoin", pages)

    // return pages
    // for (let i = 0; i > pages; i++) {
    //    <div>{i}</div>
    // }

    new Array.fill(pages).map((x, item) => {
        return <div>{x}</div>
    })

}

const Shop: NextPage = ({ products }) => {
    console.log(products)

    const [page, setPage] = useState(1)
    // const { resolvedData: products, status, error } =
    //     usePaginatedQuery(['products', page], () => WooCommerce.get(`custom-product-list?custom_page=${page}`))


    function nextPage() {
        console.log("next")
        setPage(page + 1)
        Router.push({
            pathname: '/shop',
            query: { custom_page: page }
        })
    }

    function prevPage() {
        console.log("prev")
        setPage(page - 1)
        Router.push({
            pathname: '/shop',
            query: { custom_page: page }
        })
    }

    const [text, setText] = useState("");

    function updateValue(e) {
        setText(e.value)
    }

    if (!products) return " Loading";

    return (
        <div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-12">


                    <aside className="sm:d-none col-span-12 md:col-span-4">
                        <h2>Filtering</h2>

                        <div>
                            <div>
                                Min Price: <input onChange={(e) => updateValue(e)} value={text} />
                            </div>
                            <div>
                                Max Price: <input onChange={updateValue} value={3} />
                            </div>
                        </div>
                    </aside>

                    <main className="col-span-12 md:col-span-8">

                        <p>Total Pages: {Math.floor((products.limit / products.total) * 10)}</p>

                        <div className="grid grid-cols-12">
                            <div className="grid col-span-6">
                                <p>Showing {((products.page * products.limit) - products.limit) + 1} - {products.page * products.limit} of {products.total} result</p>
                            </div>

                            <div className="grid col-span-6">
                                <p>Default sorting | Filters</p>

                            </div>
                        </div>

                        <div>
                            <button onClick={prevPage}>Prev</button>
                            {/* <div>
                                <div>1</div>
                                <div>2</div>
                            </div> */}

                            {/* <Pagination pages={Math.floor((products.limit / products.total) * 10)} /> */}
                            <Pagination pages={10} />
                            <button onClick={nextPage}>Next</button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 grid-cols-gap-2">

                            {

                                products && products.products.length ?

                                    products.products.map((product, index) => {
                                        console.log("Map", product)
                                        return (


                                            <ProducItem key={index} product={product} />

                                        )
                                    })
                                    : 'Loading'
                            }
                        </div>

                        <div>
                            <h1>Pagination</h1>
                        </div>
                    </main>



                </div>
            </div>


        </div>
    )
}

export default Shop;



Shop.getInitialProps = async (ctx) => {
    console.log("ctx", ctx.query.custom_page)
    return WooCommerce.get(`custom-product-list?custom_page=${ctx.query.custom_page}`)
        .then(response => ({ products: response.data }))
        .catch(error => ({ products: error.response.data }));

}


