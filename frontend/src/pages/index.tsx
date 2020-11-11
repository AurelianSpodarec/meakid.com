import react, { useState, useEffect } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import { Layout, Hero, ProductListing } from '../components'

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

    useEffect(() => {
        fetchProducts()
    }, [])


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



            <div className="flex flex-row mt-6">


                <div className="flex flex-col w-full">

                    <div className="p-8 flex justify-between items-end">
                        <div>
                            <p>All</p>
                            <h3 className="font-bold text-3xl">New Releases</h3>
                        </div>

                        <div className="mb-2 text-center">
                            <Link href="/fabrics">
                                <a title="fabrics" className=" text-xs md:text-base underline font-semibold py-3">
                                    View All
                            </a>
                            </Link>
                        </div>
                    </div>

                    <ProductListing
                        data={productList}
                        productListStatus={productListStatus}
                        pagination={false}
                        row={4}
                        container={false}
                    />


                </div>
            </div>


            <section className="flex m my-16 flex-wrap">
                <div className="w-full lg:w-1/2 rounded overflow-hidden px-8 mb-8">
                    <div className="flex justify-center items-center text-center relative" style={{ backgroundImage: "url('https://api.meakid.co.uk/wp-content/uploads/2020/10/flamingos1.jpg')", maxHeight: "650px", minHeight: "400px", objectFit: "cover" }}>
                        <div className="absolute top-0 right-0 bottom-0 left-0" style={{ backgroundColor: "rgba(0,0,0, .3)" }}></div>
                        <div className="z-10">
                            <h3 className="text-white mb-3 uppercase text-3xl font-bold">Shop Fabrics</h3>
                            <Link href="/fabrics?sub_category=cotton">
                                <a title="Fabrics" className="transition-all duration-200 ease-in-out text-xs md:text-base bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-8 text-xs border border-gray-400 rounded-full shadow">
                                    Shop
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="w-full lg:w-1/2 rounded overflow-hidden px-8 mb-8">
                    <div className="flex justify-center items-center text-center relative" style={{ backgroundImage: "url('https://api.meakid.co.uk/wp-content/uploads/2020/11/DINOSAUR-VOLCANO-COTTON-JERSEY-0620-NAVY-315-800x640-1.png')", minHeight: "400px", maxHeight: "650px", objectFit: "cover", }}>
                        <div className="absolute top-0 right-0 bottom-0 left-0" style={{ backgroundColor: "rgba(0,0,0, .3)" }}></div>
                        <div className="z-10">
                            <h3 className="text-white mb-3 uppercase text-3xl font-bold">Shop Jersey</h3>
                            <Link href="/fabrics?sub_category=jersey">
                                <a title="Fabrics" className="transition-all duration-200 ease-in-out text-xs md:text-base bg-white hover:bg-gray-100 text-gray-800 font-semibold py-3 px-8 text-xs border border-gray-400 rounded-full shadow">
                                    Shop
                                </a>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

        </Layout>
    )
}

export default Index;