import react, { useState, useEffect } from 'react';

import Head from 'next/head'
import { useRouter } from 'next/router'

import { Layout, ProductListing } from '../components'

import WooCommerce from '../services/meakid-wordpress/config_meakid_woocommerce';
import queryString from 'query-string';


const PRODUCT_LIST_STATES = {
    fetching: 'fetching',
    success: 'success',
    failure: 'failure',
}

// Good Article about fetching: https://kyleshevlin.com/enumerate-dont-booleanate

function Category() {

    const [productList, setProductList] = useState([])
    const [productListStatus, setProductListStatus] = useState(PRODUCT_LIST_STATES.fetching)

    const router = useRouter()
    let category = router.query.category;

    const fetchProducts = async () => {
        setProductListStatus(PRODUCT_LIST_STATES.fetching)

        const response = await WooCommerce.get(`products-list?category=${category}&page=2`);

        console.log("PORDUCT FETCHEDDDDD@@@@@@@@@@@@", response.data)
        if (response.data.products.length === 0) {
            setProductListStatus(PRODUCT_LIST_STATES.failure);
        } else {
            setProductList(response.data.products);
            setProductListStatus(PRODUCT_LIST_STATES.success);
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [category])

    return (
        <Layout title={category}>
            {/* <Layout> */}
            <section>

                <h1 className="text-5xl text-center text-accent-1">
                    {category}
                </h1>


                <div className="flex flex-row">

                    <aside style={{ minWidth: '240px' }} className="transform translate-y-full lg:translate-y-0 transition ease-in-out duration-500 fixed overflow-y-auto bg-white left-0 right-0 h-screen z-10 bottom-0 lg:block pl-4 lg:pl-12  lg:relative">
                        <h3>Sidebar</h3>
                    </aside>

                    <div className="flex flex-col w-full">
                        <ProductListing data={productList} productListStatus={productListStatus} />

                    </div>

                </div>

            </section>


        </Layout>
    )
}

export default Category;