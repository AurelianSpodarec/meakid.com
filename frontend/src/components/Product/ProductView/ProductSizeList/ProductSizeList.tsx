import ProductSizeItem from "./sub-components/ProductSizeItem"


function ProductSizeList({ product, selectedColor }) {
    const fabricsAllSizes = ["50x80", "50x160", "100x160"];

    function getAllProductSizes() {
        let allColorSizes = [];

        for (const variation of product.variations) {
            if (variation.attributes.attribute_pa_color === selectedColor) {
                console.log("ss", variation)
                allColorSizes.push(variation.attributes.attribute_pa_size)
            }
        }

        return allColorSizes;
    }

    return (
        <div className="mb-8">
            <div className="flex flex-row justify-between mb-3">
                <h5 className="uppercase text-xs text-gray-700">Select Size <span style={{ fontSize: "10px" }}>(in cm)</span></h5>
                <div className="underline text-xs text-black">Size Guide</div>
            </div>

            <div className="flex">
                {
                    fabricsAllSizes.map(size => {
                        return <ProductSizeItem size={size} />
                    })
                }
            </div>
        </div>
    )
}

export default ProductSizeList
