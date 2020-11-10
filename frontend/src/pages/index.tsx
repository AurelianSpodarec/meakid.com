import react, { useState, useEffect } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import { Layout, Hero } from '../components'

import WooCommerce from '../services/meakid-wordpress/config_meakid_woocommerce';
import { useDispatch, useSelector } from 'react-redux'

const PRODUCT_LIST_STATES = {
    fetching: 'fetching',
    success: 'success',
    failure: 'failure',
}

function Index() {

    const [productList, setProductList] = useState<any>([])
    const [productListStatus, setProductListStatus] = useState(PRODUCT_LIST_STATES.fetching)


    const fetchProducts = async () => {
        setProductListStatus(PRODUCT_LIST_STATES.fetching)

        // let b = Object.entries(router.query).reduce((acc, [key, value]) => `${acc}&${key}=${value}`, "").substring(1)
        // console.log("s", b)

        // const url = "https://meakid.co.uk";
        // let bbb = Object.entries(router.query).reduce((acc, [key, value]) => `${acc}${key}=${value}&`, `${url.length ? "?" : "&"}`).slice(0, -1);

        const response = await WooCommerce.get(`products-list?limit=4`).catch(e => console.log("Error", e));

        if (response.data.products.length === 0) {
            setProductListStatus(PRODUCT_LIST_STATES.failure);
        } else {
            setProductList(response.data);
            setProductListStatus(PRODUCT_LIST_STATES.success);
        }
    }

    return (
        <Layout title="Meakid">

            <section>
                <Hero
                    image="/images/towels.jpg"
                    title="
                New Adapt  
                OMBRE SEAMLESS"
                    subTitle="Confidence that never fades."
                    buttonName="Shop"
                    buttonLink="/fabrics"
                />
            </section>

            {/* <section className="container mx-auto px-4 my-8">
                <div>
                    <div>
                        <p>All</p>
                        <h3>New Releases</h3>
                    </div>

                    products
                </div>

                <button>View More</button>
            </section> */}


            <section className="flex container mx-auto my-16">
                <div className="w-1/2 lg:1/3 rounded overflow-hidden px-3 mb-8">
                    <div style={{ backgroundImage: "url('https://api.meakid.co.uk/wp-content/uploads/2020/10/flamingos1.jpg')", minHeight: "250px", maxHeight: "650px" }}>
                        <h3>Shop Fabrics</h3>
                        <Link href="/fabrics">
                            <a title="Fabrics" className="text-xs md:text-base bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-8 text-xs border border-gray-400 rounded-full shadow">
                                Shop
                        </a>
                        </Link>
                    </div>
                </div>

                <div className="w-1/2 lg:1/3 rounded overflow-hidden px-3 mb-8">
                    <div style={{ backgroundImage: "url('https://api.meakid.co.uk/wp-content/uploads/2020/11/DISNEY-FROZEN-ANNA-ELSA-LITTLE-JOHNNY-DIGITAL-COTTON-800x640-1-600x480.jpg')", minHeight: "250px", maxHeight: "650px" }}>
                        <h3>Shop Jersey</h3>
                        <Link href="/fabrics">
                            <a title="Fabrics" className="text-xs md:text-base bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-8 text-xs border border-gray-400 rounded-full shadow">
                                Shop
                        </a>
                        </Link>
                    </div>
                </div>
            </section>
        </Layout>
    )
}

export default Index;