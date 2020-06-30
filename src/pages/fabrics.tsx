import react, { useState, useEffect } from 'react'
import { NextPage } from 'next';

import WooCommerce from '../services/woocommerce/config_woocommerce';

import { Pagination, Sidebar, ProductList } from '../components';
import { useRouter } from 'next/router'

import queryString from 'query-string';

const Fabrics: NextPage = ({ dataProducts, dataFilterOptions }) => {

    console.log(dataProducts)


    const router = useRouter()


    const filterOptions = dataFilterOptions['dataFilterOptions']

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false)

    const [query, setQuery] = useState('');


    const fetchProducts = async () => {
        const a = await WooCommerce.get(`custom-product-list${!Object.keys(router.query).length ? "" : "?"}${queryString.stringify(router.query)}`)
            .then(response => (
                response.data
            ))
        setProducts(a)
    }


    useEffect(() => {
        fetchProducts()
        setLoading(false);
    }, [router.query])


    // var url = new URL("https://geo.example.org/api")
    // var params = {lat:35.696233, long:139.570431}

    // Object.keys(params).forEach(key => url.searchParams.append(key, params[key]))
    // fetch(url).then(/* … */)


    // useEffect(() => {
    //     const fetchData = async () => {
    //         setIsLoading(true);

    //         const result = await axios(url);

    //         setData(result.data);
    //         setIsLoading(false);
    //     };

    //     fetchData();
    // }, [url]);

    return (
        <div>
            <div style={{ maxWidth: '1920px', margin: "0 auto" }} className="">


                <div className="pl-12 pr-12 my-8">
                    <div className="flex justify-between flex-row ">

                        <div>
                            <h2 className="text-1xl font-bold">Cotton</h2>
                            <h2 className="text-2xl font-bold">Fabrics</h2>
                        </div>
                    </div>

                    <div className="flex justify-between flex-row ">
                        <div className="">
                            {
                                products ?
                                    <p>Showing {products && ((products.page * products.limit) - products.limit) + 1} - {products.page * products.limit} of {products.total} result</p>
                                    :
                                    <p>Showing 0 - 0 of 0 result</p>
                            }
                        </div>

                        <div className="px-2">

                            <p>Sort By: <span className="text-gray-500">Newest</span></p>

                        </div>
                    </div>
                </div>



                <div className="flex flex-row">

                    <aside style={{ minWidth: '240px' }} className="fixed overflow-y-auto bg-white left-0 right-0 h-screen z-10 bottom-0 lg:block pl-4 lg:pl-12  lg:relative">
                        <Sidebar filterOptions={filterOptions} />
                    </aside>


                    <main className="flex flex-col w-full">

                        <div>
                            {/* <Pagination pages={Math.floor((products.limit / products.total) * 10)} /> */}
                            <Pagination pages={20} />
                        </div>
                        <div className="flex flex-wrap px-12">
                            <ProductList products={products && products.products} loading={loading} />
                        </div>

                    </main>

                </div>
            </div>


        </div >
    )
}

export default Fabrics;

Fabrics.getInitialProps = async (ctx) => {

    const [dataFilterOptions] = await Promise.all([
        WooCommerce.get("filter-options").then(response => ({ dataFilterOptions: response.data })),
    ]);

    return { dataFilterOptions };
}