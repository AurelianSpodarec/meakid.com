import ProductSizeItem from "./sub-components/ProductSizeItem"



function ProductSizeList() {
    const fabricsAllSizes = ["50x80", "50x160", "100x160"];

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
