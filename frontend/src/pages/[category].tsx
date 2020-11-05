import react, { useState, useEffect } from 'react';

import Head from 'next/head'
import { useRouter } from 'next/router'

import { Layout, ProductListing, SidebarFilter } from '../components'

import WooCommerce from '../services/meakid-wordpress/config_meakid_woocommerce';
import queryString from 'query-string';
import { useDispatch, useSelector } from 'react-redux'

const PRODUCT_LIST_STATES = {
    fetching: 'fetching',
    success: 'success',
    failure: 'failure',
}

import {
    closeFilter,
    openFilter,
    filterOpenState
} from './../lib/slices/cartSlice';
import { capitalizeFirstLetter } from '../utils/helpers';

// Good Article about fetching: https://kyleshevlin.com/enumerate-dont-booleanate

function Category({ dataFilterOptions }) {

    console.log("@@@", dataFilterOptions)

    const dispatch = useDispatch()

    const [productList, setProductList] = useState([])
    const [productListStatus, setProductListStatus] = useState(PRODUCT_LIST_STATES.fetching)

    const openFilterState = useSelector(filterOpenState)

    const router = useRouter()
    let category = router.query.category;

    console.log('couter', router)

    const fetchProducts = async () => {
        setProductListStatus(PRODUCT_LIST_STATES.fetching)

        // let b = Object.entries(router.query).reduce((acc, [key, value]) => `${acc}&${key}=${value}`, "").substring(1)
        // console.log("s", b)

        const url = "https://meakid.co.uk";
        let bbb = Object.entries(router.query).reduce((acc, [key, value]) => `${acc}${key}=${value}&`, `${url.length ? "?" : "&"}`).slice(0, -1);

        const response = await WooCommerce.get(`products-list${bbb}`).catch(e => console.log("Error", e));

        // console.log("@@", bbb)

        console.log("PORDUCT FETCHEDDDDD@@@@@@@@@@@@", response.data)
        if (response.data.products.length === 0) {
            setProductListStatus(PRODUCT_LIST_STATES.failure);
        } else {
            setProductList(response.data);
            setProductListStatus(PRODUCT_LIST_STATES.success);
        }
    }

    function toggleFilter() {
        console.log("fire")
        if (openFilterState) {
            dispatch(closeFilter())
        } else {
            dispatch(openFilter())
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [category, router.query])

    return (
        <Layout title={category}>
            {/* <Layout> */}
            <section>

                <div className="flex flex-row justify-between">
                    <div className="flex">
                        <h1 className="text-3xl font-bold text-center text-accent-1">
                            {capitalizeFirstLetter(category)}
                        </h1>
                        <span>({productList && productList.totalProducts})</span>
                    </div>

                    <div className="lg:hidden" onClick={() => toggleFilter()}>
                        <svg style={{ height: "20px" }} aria-hidden="true" viewBox="0 0 512 512"><path fill="currentColor" d="M496 384H160v-16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h80v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h336c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-160h-80v-16c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16c-8.8 0-16 7.2-16 16v32c0 8.8 7.2 16 16 16h336v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h80c8.8 0 16-7.2 16-16v-32c0-8.8-7.2-16-16-16zm0-160H288V48c0-8.8-7.2-16-16-16h-32c-8.8 0-16 7.2-16 16v16H16C7.2 64 0 71.2 0 80v32c0 8.8 7.2 16 16 16h208v16c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16v-16h208c8.8 0 16-7.2 16-16V80c0-8.8-7.2-16-16-16z"  ></path></svg>
                    </div>
                </div>


                <div className="flex flex-row">

                    <aside style={{ minWidth: '240px' }} className={`${openFilterState ? 'translate-y-0' : 'translate-y-full'} z-50 transform lg:translate-y-0 transition ease-in-out duration-500 fixed overflow-y-auto bg-white left-0 right-0 h-screen z-10 bottom-0 lg:block pl-4 lg:pl-12  lg:relative`}>
                        <div className="lg:hidden flex justify-between w-full">
                            <div></div>
                            <div onClick={() => dispatch(closeFilter())}>X</div>
                        </div>
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