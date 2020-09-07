import react, { useState, useEffect } from 'react';

import Head from 'next/head'
import { useRouter } from 'next/router'

import { Layout } from '../components'

import WooCommerce from '../services/meakid-wordpress/config_meakid_woocommerce';
import queryString from 'query-string';


function Category() {

    const [productList, setProductList] = useState([])

    const router = useRouter()
    let category = router.query.category;

    const fetchProducts = async () => {
        const products = await WooCommerce.get(`products-list?category=${category}`).then(res => res.data);
        setProductList(products)
    }

    useEffect(() => {
        fetchProducts()
    }, [category])

    console.log("products", productList)

    return (
        <Layout>
            <Head>
                <title>Create Next App</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <section>

                <h1 className="text-5xl text-center text-accent-1">
                    {category}
                </h1>

                <div>

                </div>

            </section>


        </Layout>
    )
}

export default Category;