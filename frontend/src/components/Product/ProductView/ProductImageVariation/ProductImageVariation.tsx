import ImageVariationItem from "./sub-components/ImageVariationItem";
import { useEffect } from "react";

function ProductImageVariation({ product, selectedSize, variationImages, selectedColor, setSelectedColor }) {
    console.log(variationImages)

    function getAllProductVariations() {
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

    useEffect(() => {
        getAllProductVariations()
    }, [])

    return (
        <div className="mb-8">
            {
                variationImages && variationImages.map(item => {
                    return <ImageVariationItem item={item} selectedColor={selectedColor} onClick={setSelectedColor} />
                })
            }
        </div>
    )
}

export default ProductImageVariation
