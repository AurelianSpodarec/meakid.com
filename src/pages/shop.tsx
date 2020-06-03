import react, { useState, useEffect } from 'react'
import { NextPage } from 'next';

import WooCommerce from './../services/woocommerce/config_woocommerce';
import ProducItem from '../components/ProductItem';
import { Pagination, Sidebar } from '../components';


const Shop: NextPage = ({ dataProducts, dataFilterOptions }) => {


    console.log(dataProducts['dataProducts'], dataFilterOptions)


    const products = dataProducts['dataProducts']
    const filterOptions = dataFilterOptions['dataFilterOptions']

    const [text, setText] = useState("");

    const [loading, setLoading] = useState(true)

    function updateValue(e) {
        setText(e.value)
    }

    return (
        <div>

            <div className="container mx-auto px-4">
                <div className="grid grid-cols-12">

                    <aside className="sm:d-none col-span-12 md:col-span-4">
                        <Sidebar filterOptions={filterOptions} />
                    </aside>

                    <main className="col-span-12 md:col-span-8">


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

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <ProductList products={products} />
                        </div>

                    </main>

                </div>
            </div>


        </div >
    )
}

export default Shop;

function ProductList({ products }) {
    return (


        products.products && products.products.length ?

            products.products.map((product, index) => {
                return <ProducItem key={index} product={product} />
            })
            : 'Loading'

    )
}

Shop.getInitialProps = async (ctx) => {
    console.log("ctxxxxxxxxxxxxxxxx", ctx.query)


    const [dataProducts, dataFilterOptions] = await Promise.all([
        WooCommerce.get(`custom-product-list?page=${ctx.query.page}&colors=${ctx.query.colors}`).then(response => ({ dataProducts: response.data })),
        // WooCommerce.get(`custom-product-list?page=${ctx.query.page}`).then(response => ({ dataProducts: response.data })),
        WooCommerce.get("filter-options").then(response => ({ dataFilterOptions: response.data })),
    ]);

    return { dataProducts, dataFilterOptions };
}