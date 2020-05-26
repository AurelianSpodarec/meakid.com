import * as React from 'react'
import { NextPage } from 'next'


import WooCommerce from './../services/woocommerce/config_woocommerce';
import ProducItem from '../components/ProductItem';

const Shop: NextPage = ({ products }) => {
    console.log(products)
    return (
        <div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-12">


                    <aside className="sm:d-none col-span-12 md:col-span-4">
                        <h2>Filtering</h2>
                    </aside>

                    <main className="col-span-12 md:col-span-8">


                        <div className="grid grid-cols-12">
                            <div className="grid col-span-6">
                                <p>Showing 1-1 of {products.total} result</p>
                            </div>

                            <div className="grid col-span-6">
                                <p>Default sorting | Filters</p>

                            </div>
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

export default Shop

Shop.getInitialProps = async () => {

    // return WooCommerce.get("products")
    return WooCommerce.get("custom-product-list")
        .then(response => ({ products: response.data }))
        .catch(error => ({ products: error.response.data }));

}


