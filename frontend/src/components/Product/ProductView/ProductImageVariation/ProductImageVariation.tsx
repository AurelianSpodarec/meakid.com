import { useEffect } from "react";
import ImageVariationItem from "./sub-components/ImageVariationItem";

function ProductImageVariation({ product, selectedSize, variationImages, selectedColor, setSelectedColor, currentProduct }) {

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
                    return <ImageVariationItem item={item} selectedColor={selectedColor} currentProduct={currentProduct} onClick={setSelectedColor} />
                })
            }
        </div>
    )
}

export default ProductImageVariation
