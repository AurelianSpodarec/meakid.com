import React, { useState, useEffect, useMemo } from 'react';
import ProductSizeItem from "./sub-components/ProductSizeItem"


function ProductSizeList({ product, selectedColor, onSizeChange, currentProduct, currentProductVariations, selectedSize }) {
    const fabricsAllSizes = ["50x80", "50x160", "100x160"];

    //currentProductVariations
    console.log("currentProductVariations", currentProductVariations)
    console.log("fabricsAllSizes", fabricsAllSizes)

    const [sortedProductVariation, setSortedProductVariation] = useState([])

    function abc() {
        console.log("ereer", currentProductVariations)
        if (currentProductVariations !== null) {
            console.log("ABBCCCABACCABABABBABAABBBBBBBBBa")
            const sortedProducts = [];

            const re = fabricsAllSizes.forEach((size, index) => {

                const productWithGivenSize = currentProductVariations.find(product => product.attributes.attribute_pa_size === size);
                sortedProducts[index] = productWithGivenSize;

            })

            setSortedProductVariation(sortedProducts)
        }
        // if (re.qty === 0 || re.qty === "") {
        //     // in stock false
        //     // if a size doesn't exist, we want to loop that too, and say inStock false
        // }
    }

    useEffect(() => {
        abc()
    }, [onSizeChange])


    // loop through and attach the quantity and size - make it so if empty, or not existent, ot 0 inStock = false,
    // if product doesn't exist, display the size anyway






    // function getAllProductSizes() {
    //     let allColorSizes = [];

    //     for (const variation of product.variations) {
    //         if (variation.attributes.attribute_pa_color === selectedColor) {
    //             allColorSizes.push(variation.attributes.attribute_pa_size)
    //         }
    //     }
    //     return allColorSizes;
    // }

    // const sizes = useMemo(() => getAllProductSizes(product, selectedColor), [product, selectedColor])

    // const inStockProductSizesMap = sizes.reduce((acc, curr) => {
    //     acc[curr] = curr
    //     return acc
    // }, {});

    // const getSelectedProductVariations = () => {
    //     let selectedProductVariations = []
    //     const f = product.variations.filter(product => product.attribute_pa_color === selectedColor)
    // }



    // const allSizesCollection = fabricsAllSizes.reduce((acc, curr) => {
    //     // console.log("WQWWQQWQWQWQWQWQW", acc, curr)
    //     return acc.concat({ inStock: !!inStockProductSizesMap[curr], size: curr, qty: curr })
    // }, [])

    return (
        <div className="mb-8">
            <div className="flex flex-row justify-between mb-3">
                <h5 className="uppercase text-xs text-gray-700">Select Size <span style={{ fontSize: "10px" }}>(in cm)</span></h5>
                <div className="underline text-xs text-black">Size Guide</div>
            </div>

            <div className="flex">
                {
                    currentProduct && sortedProductVariation.map((size, index) => {
                        return (
                            <ProductSizeItem
                                onSizeChange={onSizeChange}
                                size={size}
                                currentProduct={currentProduct}
                                selectedSize={selectedSize}
                            />
                        )
                    })
                }
            </div>
        </div>
    )
}

export default ProductSizeList
