import React, { useState, useEffect, useMemo } from 'react';
import ProductSizeItem from "./sub-components/ProductSizeItem"


function ProductSizeList({ product, selectedColor, onSizeChange, currentProduct, currentProductVariations, selectedSize }) {
    const fabricsAllSizes = ["50x80", "50x160", "100x160"];

    console.log("fabricsAllSizes", fabricsAllSizes)
    console.log("currentProductVariations", currentProductVariations)
    function getAllProductSizes() {
        let allColorSizes = [];

        for (const variation of product.variations) {
            if (variation.attributes.attribute_pa_color === selectedColor) {
                allColorSizes.push(variation)
            }
        }
        return allColorSizes;
    }

    const sizes = useMemo(() => getAllProductSizes(product, selectedColor), [product, selectedColor])

    const inStockProductSizesMap = sizes.reduce((acc, curr) => {
        console.log("sizes", acc)
        acc[curr] = curr
        return acc
    }, {});

    const getSelectedProductVariations = () => {
        let selectedProductVariations = []
        const f = product.variations.filter(product => product.attribute_pa_color === selectedColor)
    }

    const allSizesCollection = fabricsAllSizes.reduce((acc, curr) => {
        return acc.concat({ inStock: !!inStockProductSizesMap[curr], size: curr, qty: curr })
    }, [])



    return (
        <div className="mb-8">
            <div className="flex flex-row justify-between mb-3">
                <h5 className="uppercase text-xs text-gray-700">Select Size <span style={{ fontSize: "10px" }}>(in cm)</span></h5>
                <div className="underline text-xs text-black">Size Guide</div>
            </div>

            <div className="flex">
                {
                    currentProduct && currentProductVariations.map((item, index) => {
                        return (
                            <ProductSizeItem
                                onSizeChange={onSizeChange}
                                item={item}
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
