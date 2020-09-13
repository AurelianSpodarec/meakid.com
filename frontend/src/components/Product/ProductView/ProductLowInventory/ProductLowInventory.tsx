function ProductLowInventory({ currentProduct, selectedSize }) {
    return (
        <div style={{ backgroundColor: "#fbebab" }} className="w-full text-center my-6">
            {
                selectedSize &&
                currentProduct && currentProduct.max_qty !== "" &&
                currentProduct.max_qty < 20 &&
                <div className="py-2">Low inventory! {currentProduct.max_qty} left!</div>
            }
        </div>
    )
}

export default ProductLowInventory;
