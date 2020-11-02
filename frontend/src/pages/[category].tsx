import react, { useState, useEffect } from 'react';

import Head from 'next/head'
import { useRouter } from 'next/router'

import { Layout, ProductListing, SidebarFilter } from '../components'

import WooCommerce from '../services/meakid-wordpress/config_meakid_woocommerce';
import queryString from 'query-string';


const PRODUCT_LIST_STATES = {
    fetching: 'fetching',
    success: 'success',
    failure: 'failure',
}

// Good Article about fetching: https://kyleshevlin.com/enumerate-dont-booleanate

function Category({ dataFilterOptions }) {

    console.log("@@@", dataFilterOptions)

    const [productList, setProductList] = useState([])
    const [productListStatus, setProductListStatus] = useState(PRODUCT_LIST_STATES.fetching)

    const router = useRouter()
    let category = router.query.category;

    console.log('couter', router)

    const fetchProducts = async () => {
        setProductListStatus(PRODUCT_LIST_STATES.fetching)

        // let b = Object.entries(router.query).reduce((acc, [key, value]) => `${acc}&${key}=${value}`, "").substring(1)
        // console.log("s", b)

        const url = "https://meakid.co.uk";
        let bbb = Object.entries(router.query).reduce((acc, [key, value]) => `${acc}${key}=${value}&`, `${url.length ? "?" : "&"}`).slice(0, -1);

        const response = await WooCommerce.get(`products-list${bbb}`);

        // console.log("@@", bbb)

        console.log("PORDUCT FETCHEDDDDD@@@@@@@@@@@@", response.data)
        if (response.data.products.length === 0) {
            setProductListStatus(PRODUCT_LIST_STATES.failure);
        } else {
            setProductList(response.data);
            setProductListStatus(PRODUCT_LIST_STATES.success);
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [category, router.query])

    return (
        <Layout title={category}>
            {/* <Layout> */}
            <section>

                <h1 className="text-5xl text-center text-accent-1">
                    {category}
                </h1>


                <div className="flex flex-row">

                    <aside style={{ minWidth: '240px' }} className="transform translate-y-full lg:translate-y-0 transition ease-in-out duration-500 fixed overflow-y-auto bg-white left-0 right-0 h-screen z-10 bottom-0 lg:block pl-4 lg:pl-12  lg:relative">
                        <SidebarFilter filterOptions={dataFilterOptions} />
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

Category.getInitialProps = async (ctx) => {

    const [dataFilterOptions] = await Promise.all([
        WooCommerce.get("filter-options").then(response => ({ dataFilterOptions: response.data })).catch(e => console.log("Error cateogyr", e)),
    ]);

    return { dataFilterOptions };
}