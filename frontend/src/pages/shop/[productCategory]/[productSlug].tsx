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


import {
    addItemToCart,
    removeItemFromCart,
    increaseItemQuantity,
    decreaseItemQuantity,
    clearCart,
    loadCard,
    selectProducts,
    // addToCartAsync,
    sliceAddItem
} from './../../../lib/slices/cartSlice'
import { useDispatch, useSelector } from 'react-redux'


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

    const router = useRouter();
    const productCategory = router.query.productCategory

    const [currentProduct, setCurrentProduct] = useState();
    const [currentProductVariations, setCurrentProductVariations] = useState(null);
    const [productQuantity, setProductQuantity] = useState(1);

    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);


    const [featuredImage, setFeaturedImage] = useState(null)
    const [variationImages, setVariationImages] = useState(null)

    const hasVariations = product.variations.length > 0;

    const dispatch = useDispatch()

    console.log("s", currentProduct)
    function onAddToCart() {
        let itemOptions = {
            "product_id": product.id,
            "quantity": 1,
            "variation_id": currentProduct.variation_id,
            "variation": {
                "attribute_colors": currentProduct.attributes.attribute_pa_colors,
                "attribute_pa_size:": currentProduct.attributes.attribute_pa_size
            }
        }

        if (hasVariations) {
            dispatch(sliceAddItem(itemOptions))

        } else {
            dispatch(sliceAddItem(itemOptions))
        }
    }
    // console.log("QWWQW", dispatch(selectProducts))

    function onLoadInitialValues() {
        setFeaturedImage(hasVariations ? product.variations[0].image.url : product.featured_image)

        if (hasVariations && !selectedColor) {
            setSelectedColor(product.variations[0].attributes.attribute_pa_colors)
        }
    }

    function getCurrentProductVariations() {
        const productVar = product.variations.filter(item => item.attributes.attribute_pa_colors === selectedColor);
        setCurrentProductVariations(productVar);
    }

    function getCurrentVariationBySize() {
        const productVar = product.variations.find(item => item.attributes.attribute_pa_size === selectedSize);
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

    function onSizeChange(size) {
        setSelectedSize(size)
    }

    useEffect(() => {
        onChangeImage()
        getCurrentVariationBySize()
        getCurrentProductVariations()
        setCurrentProduct(getVariationProduct(product, selectedColor, selectedSize))
    }, [selectedColor, selectedSize])

    useEffect(() => {
        onChangeImage()
    }, [currentProduct])

    useEffect(() => {
        setSelectedSize(null)
    }, [featuredImage])

    useEffect(() => {
        onLoadInitialValues()
        setUniqueImages()
    }, [])


    let productTotalPrice = productQuantity * product.price || currentProduct.display_price;

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

                        <div className="my-4">
                            <span className="text-xl text-gray-700">£{currentProduct && currentProduct.display_price.toFixed(2)}</span>
                        </div>

                        <div>
                            <ProductImageVariation
                                product={product}
                                selectedSize={selectedSize}
                                variationImages={variationImages}
                                selectedColor={selectedColor}
                                currentProduct={currentProduct}
                                setSelectedColor={(color) => setSelectedColor(color)}
                            />
                        </div>

                        <div>
                            <ProductSizeList
                                product={product}
                                onSizeChange={(size) => onSizeChange(size)}
                                currentProduct={currentProduct}
                                selectedSize={selectedSize}
                                currentProductVariations={currentProductVariations}
                            />
                        </div>

                        <div>
                            <ProductLowInventory
                                selectedSize={selectedSize}
                                currentProduct={currentProduct}
                            />
                        </div>

                        <div>

                            <div className="flex">
                                <div className="">
                                    <span>Quantity</span>
                                    <input value={1} />
                                </div>
                                <div>
                                    <span>Total Price:</span>
                                    <span>£{productTotalPrice.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="flex flex-row">
                                <button onClick={() => onAddToCart()} className="bg-blue-600 w-full rounded-full uppercase py-4 text-xs hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Add to cart</button>
                            </div>
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