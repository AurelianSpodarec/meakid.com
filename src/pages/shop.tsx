import react, { useState, useEffect } from 'react'
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import usePaginatedQuery from 'react-query'

import WooCommerce from './../services/woocommerce/config_woocommerce';
import ProducItem from '../components/ProductItem';

import Router from 'next/router'


function Pagination({ pages }) {
    const router = useRouter()
    const [currentPage, setPage] = useState(parseInt(router.query.custom_page));

    // console.log("sd", Router.router ? Router.router.query.custom_page : "null")
    console.log(router)
    useEffect(() => {

        // const a = router ? router.query.custom_page : 1;
        // setPage()
    }, [])

    let pagesArr = [];


    for (let i = 0; i < pages; i++) {
        pagesArr.push(i + 1)
    }

    // pagesArr.

    function nextPage() {
        console.log("next")
        setPage(currentPage + 1)
        Router.push({
            pathname: '/shop',
            query: { custom_page: currentPage }
        })
    }

    function prevPage() {
        console.log("prev")
        setPage(currentPage - 1)
        Router.push({
            pathname: '/shop',
            query: { custom_page: currentPage }
        })
    }

    // Show max of 10 pages, last item show to be highest

    return (
        <nav className="relative z-0 inline-flex shadow-sm">
            <div className="flex-1 flex justify-between">
                <a onClick={prevPage} className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
                    Previous
                </a>

                {pagesArr.slice(0, 10).map((_, item) => {
                    return (

                        <Link href={{
                            pathname: '/shop',
                            query: { custom_page: _ }
                        }}>
                            <button onClick={() => setPage(_)} type="button" style={{ backgroundColor: currentPage === _ ? 'grey' : "" }} className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
                                {_}
                            </button>
                        </Link>
                    )
                })}

                <button type="button" className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
                    ...
                </button>

                <Link href={{
                    pathname: '/shop',
                    query: { custom_page: pages }
                }}>
                    <button type="button" style={{ backgroundColor: currentPage === pages ? 'grey' : "" }} className="-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:z-10 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
                        {pages}
                    </button>
                </Link>

                <a onClick={nextPage} className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:bg-gray-100 active:text-gray-700 transition ease-in-out duration-150">
                    Next
                </a>
            </div>
        </nav>
    )

    // return <div>{pages}</div>

}

// function CustomLink() {

// }

const Shop: NextPage = ({ products }) => {
    console.log(products)

    const [page, setPage] = useState(1)
    // const { resolvedData: products, status, error } =
    //     usePaginatedQuery(['products', page], () => WooCommerce.get(`custom-product-list?custom_page=${page}`))




    const [text, setText] = useState("");

    function updateValue(e) {
        setText(e.value)
    }

    if (!products || products.lenght === 0) return " Loading";

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



                            {/* <Pagination pages={Math.floor((products.limit / products.total) * 10)} /> */}
                            <Pagination pages={20} />



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


        </div >
    )
}

export default Shop;



Shop.getInitialProps = async (ctx) => {
    console.log("ctx", ctx.query.custom_page)
    return WooCommerce.get(`custom-product-list?custom_page=${ctx.query.custom_page}`)
        .then(response => ({ products: response.data }))
        .catch(error => ({ products: error.response.data }));

}


