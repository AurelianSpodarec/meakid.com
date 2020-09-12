import react, { useState, useEffect } from 'react';

import Head from 'next/head'
import Router from 'next/router'
import { useRouter } from 'next/router'

import { Layout } from '../../../components';
import WooCommerce from '../../../services/meakid-wordpress/config_meakid_woocommerce';

import {
    ProductFeaturedImage,
    ProductSizeList,
    ProductLowInventory,
    ProductImageVariation,
} from '../../../components/Product/ProductView/index.js'

function getVariationProduct(product, selectedColor, selectedSize) {
    let variationProduct;

    for (const variation of product.variations) {

        if (!selectedSize) {
            if (variation.attributes.attribute_pa_colors === selectedColor) {
                variationProduct = variation
            }
        } else {
            if (variation.attributes.attribute_pa_colors === selectedColor && variation.attributes.attribute_pa_size === selectedSize) {
                variationProduct = variation
            }
        }
    }

    return variationProduct;
}

function ProductSlug({ data }) {

    const product = data[0];
    // console.log(product)

    const router = useRouter();
    const productCategory = router.query.productCategory

    const [currentProduct, setCurrentProduct] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    const [featuredImage, setFeaturedImage] = useState(null)
    const [variationImages, setVariationImages] = useState(null)

    const hasVariations = product.variations.length > 0;


    function onLoadInitialValues() {
        console.log(hasVariations)
        setFeaturedImage(hasVariations ? product.variations[0].image.url : product.featured_image)


        if (hasVariations && !selectedColor) {
            setSelectedColor(product.variations[0].attributes.attribute_pa_colors)
        }
    }


    function onChangeImage() {
        if (hasVariations) {
            setFeaturedImage(currentProduct && currentProduct.image.src)
        }
    }

    function setUniqueImages() {
        if (product.variations && hasVariations) {
            console.log("sdsfsdfsfadafdf", product.variations)
            setVariationImages(
                Object.values(
                    product.variations.reduce((acc, variation) => {
                        const color = variation.attributes.attribute_pa_colors;

                        acc[color] = {
                            image: variation.image.src,
                            color,
                        };

                        return acc;
                    }, {})
                )
            );
        }
    }

    useEffect(() => {
        onChangeImage()
        setCurrentProduct(getVariationProduct(product, selectedColor, selectedSize))
    }, [selectedColor, selectedSize])

    useEffect(() => {
        onChangeImage()
    }, [currentProduct])

    useEffect(() => {
        onLoadInitialValues()
        setUniqueImages()
    }, [])

    return (
        <Layout title={product.name}>
            <section style={{ maxWidth: '1440px' }} className="mx-auto lg:px-12 lg:py-16">
                <div className="block lg:flex">


                    <div className="w-full relative flex-1">
                        <ProductFeaturedImage image={featuredImage} />
                    </div>


                    <div className="p-4 relative w-full lg:ml-24 lg:w-94 lg:p-0">
                        <div>
                            <h5 className="text-sm uppercase">Meakid {productCategory}</h5>
                            <h1 className="text-xl uppercase color-gray-900 font-bold">{product.name}</h1>
                        </div>


                        <div>
                            <ProductImageVariation
                                product={product}
                                selectedSize={selectedSize}
                                variationImages={variationImages}
                                selectedColor={selectedColor}
                                setSelectedColor={(color) => setSelectedColor(color)}
                            />
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