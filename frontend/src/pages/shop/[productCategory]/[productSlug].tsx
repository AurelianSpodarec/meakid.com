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
    openCart,
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

    const dispatch = useDispatch()
    const router = useRouter();

    const [currentProduct, setCurrentProduct] = useState();
    const [currentProductVariations, setCurrentProductVariations] = useState(null);
    const [productQuantity, setProductQuantity] = useState(1);

    const [selectedColor, setSelectedColor] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);

    const [featuredImage, setFeaturedImage] = useState(null)
    const [variationImages, setVariationImages] = useState(null)

    const hasVariations = product.variations.length > 0;
    const productCategory = router.query.productCategory


    console.log("s", product, currentProduct)

    function onAddToCart() {
        if (selectedSize) {
            dispatch(openCart())
        }

        if (hasVariations) {
            let itemOptions = {
                "product_id": product.id,
                "quantity": productQuantity,
                "variation_id": currentProduct.variation_id,
                "variation": {
                    "attribute_colors": currentProduct.attributes.attribute_pa_colors,
                    "attribute_pa_size:": currentProduct.attributes.attribute_pa_size
                }
            }
            dispatch(sliceAddItem(itemOptions))

        } else {
            let itemOptions = {
                "product_id": product.id,
                "quantity": productQuantity,
                "variation": {
                    "attribute_colors": currentProduct.attributes.attribute_pa_colors,
                    "attribute_pa_size:": currentProduct.attributes.attribute_pa_size
                }
            }
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


    function increaseProductQuantity() {
        if (selectedSize) {
            if (productQuantity !== 99) {
                setProductQuantity(productQuantity + 1)
            }
        }

    }

    function decreaseProductQuantity() {
        if (selectedSize) {
            if (productQuantity !== 1) {
                setProductQuantity(productQuantity - 1)
            }
        }
    }

    let totalPrice = currentProduct ? !selectedSize ? currentProduct && currentProduct.display_price * productQuantity : currentProduct && currentProduct.display_price * productQuantity : 0

    useEffect(() => {
        onChangeImage()
        getCurrentVariationBySize()
        getCurrentProductVariations()
        setCurrentProduct(getVariationProduct(product, selectedColor, selectedSize))
        setProductQuantity(1)
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

        // test()
    }, [])


    async function test() {
        const data = {
            "line_items": [
                {
                    "product_id": 17,
                    "variation_id": 28,
                    "quantity": 1
                }
            ]
        }
        // const res = await WooCommerce.post('orders', data).then(res => res).catch(e => e)

        // console.log("SSS", res)


        // const res = await WooCommerce.post("orders", data)
        //     .then((response) => {
        //         console.log("Then", response);
        //     })
        //     .catch((error) => {
        //         console.log("Error:", error.response);
        //     });

        // console.log("SSS", res)
    }



    // let productTotalPrice = productQuantity * currentProduct.display_price

    return (
        <Layout title={product.name}>
            <section style={{ maxWidth: '1440px' }} className="mx-auto lg:px-12 lg:py-16">
                <div className="block lg:flex">


                    <div className="w-full relative flex-1">
                        <ProductFeaturedImage image={featuredImage} />
                    </div>


                    <aside className="p-4 relative w-full lg:ml-24 lg:w-94 lg:p-0">
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


                        <div className="flex mb-6">
                            <div className="flex">
                                <div onClick={() => decreaseProductQuantity()} className="border w-12 h-12 fill-current flex transform transition duration-200 ease-in-out text-gray-600 cursor-pointer items-center justify-center hover:bg-gray-800 hover:text-gray-100">
                                    -
                                </div>
                                <p className="flex items-center justify-center cursor-default border text-xs w-12 h-12 text-center">{productQuantity}</p>
                                <div onClick={() => increaseProductQuantity()} className="border w-12 h-12 fill-current flex transform transition duration-200 ease-in-out text-gray-600 cursor-pointer items-center justify-center hover:bg-gray-800 hover:text-gray-100">
                                    +
                                </div>
                            </div>
                            <div className="flex md:ml-2 items-center">
                                <p className="font-bold mr-2 ">Total:</p><span>£{totalPrice.toFixed(2)}GBP</span>
                            </div>
                        </div>


                        <div className="flex flex-row">
                            <button onClick={() => onAddToCart()} className="bg-blue-600 w-full rounded-full uppercase py-4 text-xs hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Add to cart</button>
                        </div>
                    </aside>






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