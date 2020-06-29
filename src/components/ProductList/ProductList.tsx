import ProducItem from "./ProductItem/ProductItem";
import NoProductsFound from "./NoProductsFound/NoProductsFound";
import { useEffect } from "react";


// if exist, show products, if exist but loading show loading, else show not found

function ProductList({ products, loading }) {
    console.log(products)

    function renderProductList() {

        if (loading) {
            console.log("1")
            return "Loading";
        } else if (products && products.length) {
            return products.map((product, index) => {
                return <ProducItem key={index} product={product} />
            })
        }

        return <NoProductsFound />
    }

    // useEffect(() => {
    //     renderProductList()
    // }, [products])

    return (
        <>
            {renderProductList()}
        </>
    )
}

export default ProductList;