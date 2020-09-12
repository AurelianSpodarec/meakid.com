function ProductLowInventory({ quantity }) {
    return (
        <div style={{ backgroundColor: "#fbebab" }} className="w-full text-center my-6">
            {/* <div className="py-2">Low inventory! {currentProduct.max_qty} left!</div> */}
            <div className="py-2">Low inventory!   left!</div>
        </div>
    )
}

export default ProductLowInventory;
