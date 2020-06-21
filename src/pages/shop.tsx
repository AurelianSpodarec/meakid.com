import react, { useState, useEffect } from 'react'
import { NextPage } from 'next';

import WooCommerce from './../services/woocommerce/config_woocommerce';
import ProducItem from '../components/ProductList/ProductItem/ProductItem';
import { Pagination, Sidebar, ProductList, Banner } from '../components';


const Shop: NextPage = ({ dataProducts, dataFilterOptions }) => {


    // console.log(dataProducts['dataProducts'], dataFilterOptions)

    console.log(dataProducts)

    // const products = dataProducts['dataProducts']
    const filterOptions = dataFilterOptions['dataFilterOptions']

    const [products, setProducts] = useState([]);

    const [text, setText] = useState("");

    const [loading, setLoading] = useState(true)

    function updateValue(e) {
        setText(e.value)
    }

    useEffect(() => {

        if (products) {
            setLoading(true);
        }
        setLoading(false);

    }, [products])

    useEffect(() => {
        setProducts(dataProducts['dataProducts'])
    }, [dataProducts['dataProducts']]);

    return (
        <div>
            <Banner />
            <div style={{ maxWidth: '1920px', margin: "0 auto" }} className="">
                <div className="flex flex-row">

                    <aside style={{ minWidth: '240px' }} className="sm:d-none pl-12  ">
                        <Sidebar filterOptions={filterOptions} />
                    </aside>


                    <main className="flex flex-col w-full">


                        <div className="flex flex-row ">
                            <div className=" ">
                                {
                                    products ?
                                        <p>Showing {products && ((products.page * products.limit) - products.limit) + 1} - {products.page * products.limit} of {products.total} result</p>
                                        :
                                        <p>Showing 0 - 0 of 0 result</p>
                                }
                            </div>

                            <div className=" ">
                                <p>Default sorting | Filters</p>

                            </div>
                        </div>


                        {/* <Pagination pages={Math.floor((products.limit / products.total) * 10)} /> */}
                        {/* <Pagination pages={20} /> */}


                        <div className="flex flex-wrap px-12">
                            <ProductList products={products} loading={loading} />
                        </div>


                    </main>

                </div>
            </div>


        </div >
    )
}

export default Shop;

Shop.getInitialProps = async (ctx) => {

    const params = new URLSearchParams();

    if (ctx.query.colors) {
        params.set("colors", ctx.query.colors);
    }
    if (ctx.query.page) {
        params.set("page", ctx.query.page);
    }
    if (ctx.query['price[min]']) {
        params.set("price[min]", ctx.query['price[min]']);
    }
    if (ctx.query['price[max]']) {
        params.set("price[max]", ctx.query['price[max]']);
    }

    const [dataProducts, dataFilterOptions] = await Promise.all([
        WooCommerce.get(`custom-product-list?${params}`)
            .then(response => ({ dataProducts: response.data })),

        WooCommerce.get("filter-options").then(response => ({ dataFilterOptions: response.data })),
    ]);

    return { dataProducts, dataFilterOptions };
}