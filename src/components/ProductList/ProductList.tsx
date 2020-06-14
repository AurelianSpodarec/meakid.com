import ProducItem from "./ProductItem/ProductItem";


// if exist, show products, if exist but loading show loading, else show not found

function ProductList({ products, loading }) {
    console.log(products)

    function renderProductList() {

        if (loading) {
            console.log("1")
            return "Loading";
        } else if (products && products.products.length) {
            return products.products.map((product, index) => {
                return <ProducItem key={index} product={product} />
            })
        }

        return 'No products found'
    }

    return (
        <>
            {renderProductList()}
        </>
    )
}

export default ProductList;