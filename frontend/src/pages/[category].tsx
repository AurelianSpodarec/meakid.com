import react, { useState, useEffect } from 'react';

import Head from 'next/head'
import { useRouter } from 'next/router'


import { Layout } from '../components'
import WooCommerce from '../services/meakid-wordpress/config_meakid_woocommerce';

// TODO: create a function that loads categories data name, slug, id and uses it to retrive the correct data such as product list

function Category() {

    const [productList, setProductList] = useState([])

    const router = useRouter()
    let category = router.query.category;

    const fetchProducts = async () => {
        const products = await WooCommerce.get(`products/categories?slug=${category}`).then(res => res.data);

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
                    Category
                </h1>
            </section>



        </Layout>
    )
}

export default Category;

// get the category name, and fetch it for the productss