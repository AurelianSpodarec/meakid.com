import react, { useState, useEffect } from 'react';

import Head from 'next/head'
import Router from 'next/router'
import { useRouter } from 'next/router'

import { Layout } from '../../../components';
import WooCommerce from '../../../services/meakid-wordpress/config_meakid_woocommerce';
import ProductSizeList from '../../../components/Product/ProductView/ProductSizeList/ProductSizeList';
import ProductLowInventory from '../../../components/Product/ProductView/ProductLowInventory/ProductLowInventory';
import ProductImageVariation from '../../../components/Product/ProductView/ProductImageVariation/ProductImageVariation';


// import WooCommerce from '../services/meakid-wordpress/config_meakid_woocommerce';

function ProductSlug({ data }) {

    const product = data[0];
    console.log(product)
    const router = useRouter();

    const [currentProduct, setCurrentProduct] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);


    const productCategory = router.query.productCategory



    function onLoadInitialValues() {

    }

    function renderAddQuantity() {

    }


    function renderFeaturedImage() {
        return <img src={product.featured_image} className="w-full" />
    }

    return (
        <Layout title={product.name}>
            <section style={{ maxWidth: '1440px' }} className="mx-auto lg:px-12 lg:py-16">
                <div className="block lg:flex">


                    <div className="w-full relative flex-1">
                        {renderFeaturedImage()}
                    </div>


                    <div className="p-4 relative w-full lg:ml-24 lg:w-94 lg:p-0">
                        <div>
                            <h5 className="text-sm uppercase">Meakid {productCategory}</h5>
                            <h1 className="text-xl uppercase color-gray-900 font-bold">{product.name}</h1>
                        </div>


                        <div>
                            <ProductImageVariation />
                        </div>

                        <div>
                            <ProductSizeList />
                        </div>

                        <div>
                            <ProductLowInventory quantity="3" />
                        </div>
                    </div>


                </div>
            </section>
        </Layout>
    )
}


export async function getServerSideProps(context) {
    const res = await WooCommerce.get(`product/slug=${context.query.productSlug}`)
    const data = await res.data;
    return { props: { data } }
}

export default ProductSlug;