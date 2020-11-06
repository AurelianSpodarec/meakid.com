import React, { useState, useEffect, useMemo } from 'react';
import ProductSizeItem from "./sub-components/ProductSizeItem"


function ProductSizeList({ product, selectedColor, onSizeChange, currentProduct, currentProductVariations, selectedSize }: any) {
    // const fabricsAllSizes = ["50x80", "50x160", "100x160"];
    const fabricsAllSizes = ["fat-qauarter", "half-meter", "meter"]
    const [sortedProductVariation, setSortedProductVariation] = useState([])

    function abc() {
        if (currentProductVariations !== null) {
            const sortedProducts = [];

            const re = fabricsAllSizes.forEach((size, index) => {

                const productWithGivenSize = currentProductVariations.find(product => product.attributes.attribute_pa_size === size);
                sortedProducts[index] = productWithGivenSize;

            })

            setSortedProductVariation(sortedProducts)
        }
    }

    useEffect(() => {
        abc()
    }, [onSizeChange])

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
