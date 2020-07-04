import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import WooCommerce from './../../services/woocommerce/config_woocommerce';

import { addToCart, openCart } from './../../store/cart/cart.actions';


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

const allSizes = ["50x160cm", "50x80cm", "100x160cm"];

function ProductView({ product, cart, openCart, addToCart }: any) {
    // console.log('product', product)


    const [currentProduct, setCurrentProduct] = useState(null);

    const [mainImage, setMainImage] = useState(null)

    const [variationImages, setVariationImages] = useState(null);

    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(1)

    console.log('product, size, color, quantity, id, variationid', selectedSize, selectedColor, quantity)
    console.log('current product', currentProduct)

    const sizes = useMemo(() => getAllProductSizes(product, selectedColor), [product, selectedColor])

    function onLoadInitialValues() {
        setMainImage(product.variations ? product.variations[0].image.url : product.image[0])

        if (!selectedColor) {
            setSelectedColor(product.variations[0].attributes.attribute_pa_color)
        }
    }
    console.log("sizes", sizes)
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

    function onAddToCart(product) {
        if (selectedSize) {
            addToCart(product.id)
            openCart()
        }
        // product id
        // variation id
        // quantity
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


    const inStockProductSizesMap = sizes.reduce((acc, curr) => {
        acc[curr] = curr
        return acc
    }, {})

    const allSizesCollection = allSizes.reduce((acc, curr) => {
        return acc.concat({ inStock: !!inStockProductSizesMap[curr], size: curr })
    }, [])
    console.log("@£££@@£££@£@@£@£", inStockProductSizesMap, allSizesCollection)

    // function renderSizes() {
    //     for

    //         <button onClick={() => onSizeChange(size)} className={`${selectedSize === size ? "bg-black text-white" : ""} ${currentProduct && currentProduct.max_qty === "" ? 'bg-black' : ""} flex-1 mx-1 border-2 border text-center leading-10`}>
    //             {size}
    //         </button>

    // }

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


                        {/* If its 0, write out of stock */}

                        {
                            selectedSize &&
                            currentProduct && currentProduct.max_qty !== "" &&
                            currentProduct.max_qty < 1000 && <div>Only {currentProduct.max_qty} left!</div>
                        }


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

                        <div className="mb-8">
                            <div className="flex flex-row justify-between mb-3">
                                <h5 className="uppercase text-xs text-gray-700">Select Size <span style={{ fontSize: "10px" }}>(in cm)</span></h5>
                                <div className="underline text-xs text-black">Size Guide</div>
                            </div>
                            {
                                // currentProduct && currentProduct.max_qty === "" ? <div>Out of stock!</div> :

                                <div className="flex">
                                    {/* {
                                        sizes && sizes.map((size, index) =>
                                            <button onClick={() => onSizeChange(size)} className={`${selectedSize === size ? "bg-black text-white" : ""} flex-1 mx-1 border-2 border text-center leading-10`}>
                                                {size}
                                            </button>
                                        )
                                    } */}

                                    {
                                        allSizesCollection.map((item, index) =>

                                            <button onClick={() => onSizeChange(item.size)} className={`${selectedSize === item.size && "bg-black text-white"} ${!item.inStock && 'bg-black'} flex-1 mx-1 border-2 border text-center leading-10`}>
                                                {item.size}
                                            </button>
                                        )
                                    }
                                </div>
                            }

                        </div>



                        {/* <div className="mb-4">
                                <p>Stock quantity: {product.variations ? "load obj" : product.stock_quantity}</p>
                            </div> */}

                        <div className="flex flex-row">
                            <input></input>
                            <button onClick={() => onAddToCart(product)} className="bg-blue-600 w-full rounded-full uppercase py-4 text-xs hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Add to cart</button>
                        </div>
                        {/* If user tries to add to cart, and size is not selected, display error, if user selects the size, hide the error */}

                        {
                            !selectedSize &&
                            <p>Please select a size to add to cart</p>
                        }

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
    addToCart,
    openCart
}

const mapStateToProps = state => {
    return {
        cart: state.cart
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductView);