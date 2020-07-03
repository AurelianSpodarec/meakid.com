import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import WooCommerce from './../../services/woocommerce/config_woocommerce';

import { addToCart } from './../../store/cart/cart.actions';


function getAllProductSizes(product, selectedColor) {
    let allColorSizes = [];

    for (const variation of product.variations) {
        if (variation.attributes.attribute_pa_color === selectedColor) {
            console.log("ss", variation)
            allColorSizes.push(variation.attributes.attribute_pa_size)
        }
    }

    return allColorSizes;
}


// by color, and by size if exist
function getVariationProduct(product, selectedColor, selectedSize) {
    let variationProduct;

    for (const variation of product.variations) {

        if (!selectedSize) {
            if (variation.attributes.attribute_pa_color === selectedColor) {

                variationProduct = variation
            }
        } else {
            if (variation.attributes.attribute_pa_color === selectedColor && variation.attributes.attribute_pa_size === selectedSize) {

                variationProduct = variation
            }
        }
    }

    return variationProduct;
}



function ProductView({ product, cart, addToCart }: any) {
    console.log('product', product)


    const [currentProduct, setCurrentProduct] = useState(null);

    const [mainImage, setMainImage] = useState(null)

    const [variationImages, setVariationImages] = useState(null);

    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(1)


    const sizes = useMemo(() => getAllProductSizes(product, selectedColor), [product, selectedColor])

    function onLoadInitialValues() {
        setMainImage(product.variations ? product.variations[0].image.url : product.image[0])

        if (!selectedColor) {
            setSelectedColor(product.variations[0].attributes.attribute_pa_color)
        }
    }

    function onChangeImage() {
        setMainImage(currentProduct && currentProduct.image.src)
    }

    function setUniqueImages() {
        if (product && product.variations.length !== 0) {
            setVariationImages(
                Object.values(
                    product.variations.reduce((acc, variation) => {
                        const color = variation.attributes.attribute_pa_color;

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
        setCurrentProduct(getVariationProduct(product, selectedColor, selectedSize))
    }, [selectedColor, selectedSize])

    useEffect(() => {
        setSelectedSize(null)
    }, [mainImage])

    useEffect(() => {
        onChangeImage()
    }, [currentProduct])

    useEffect(() => {
        setUniqueImages()
        onLoadInitialValues()
    }, [])

    console.log("sizes", sizes && sizes)
    return (
        <div>
            <div style={{ maxWidth: '1440px' }} className="mx-auto lg:px-12 lg:py-16">
                <div className="block lg:flex">

                    <section className="w-full relative flex-1">
                        {
                            <img src={mainImage} className="w-full" />
                        }
                    </section>

                    <section className="p-4 relative w-full lg:ml-24 lg:w-94 lg:p-0">

                        <div>
                            <h5 className="text-sm uppercase">Meakid Fabrics</h5>
                            <h1 className="text-xl uppercase color-gray-900 font-bold">{product.name}</h1>
                        </div>

                        <div className="my-4">
                            {/* <span>{product.price.toFixed(2)}</span> */}
                            <span className="text-xl text-gray-700">£{currentProduct && currentProduct.display_price.toFixed(2)}</span>
                        </div>

                        <div className="mb-6">
                            {
                                variationImages && variationImages.map((item, index) =>

                                    <button

                                        className={(item.color === selectedColor ? "border-solid border-2 border-gray-900" : "") + " inline-block border-2 border-gray-200 mr-1 outline-none"}
                                        // onClick={() => setCurrentcolor(color)}
                                        onClick={() => setSelectedColor(item.color)}
                                        key={index}

                                    >
                                        {
                                            <img
                                                className="h-16 w-16"
                                                src={item.image}
                                            />
                                        }

                                    </button>

                                )
                            }
                        </div>

                        {/* if size not selected, when adding it to basket, show error, please select a size */}

                        <div>
                            <div className="flex flex-row justify-between mb-3">
                                <h5 className="uppercase text-xs text-gray-700">Select Size <span style={{ fontSize: "10px" }}>(in cm)</span></h5>
                                <div className="underline text-xs text-black">Size Guide</div>
                            </div>
                            <div className="flex">
                                {
                                    sizes && sizes.map((size, index) =>
                                        <button onClick={() => onSizeChange(size)} className={`flex-1 mx-1 border-2 border text-center leading-10`}>
                                            {size}
                                        </button>
                                    )
                                }
                            </div>
                        </div>


                        {/* <div className="mb-4">
                                <p>Stock quantity: {product.variations ? "load obj" : product.stock_quantity}</p>
                            </div> */}

                        <div className="flex flex-row">
                            <input></input>
                            <button onClick={() => addToCart(product.id)} className="bg-blue-600 w-full rounded-full uppercase py-4 text-xs hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Add to cart</button>
                        </div>

                        <div>

                            <div>
                                <div>
                                    <h3>Description</h3>
                                    <div>Body</div>
                                </div>
                            </div>

                        </div>
                    </section>
                </div>
            </div>

            {/* 
            <div className="bg-gray-200">
                <div>You might also like</div>
                <div>
                    Products
                    </div>
            </div> */}

        </div>
    )
}

ProductView.getInitialProps = async (ctx: any) => {
    return WooCommerce.get(`product/slug=${ctx.query['product-view']}/variations`)
        .then(response => ({ product: response.data }))
        .catch(error => ({ product: error }));
}

const mapDispatchToProps = {
    addToCart
}

const mapStateToProps = state => {
    return {
        cart: state.cart
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductView);