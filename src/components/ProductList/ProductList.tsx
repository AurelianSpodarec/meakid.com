import ProducItem from "./ProductItem/ProductItem";
import NoProductsFound from "./NoProductsFound/NoProductsFound";


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

        return <NoProductsFound />
    }

    return (
        <>
            {renderProductList()}
        </>
    )
}

export default ProductList;