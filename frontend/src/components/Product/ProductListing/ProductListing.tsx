import Link from "next/link";
import ProductItem from "../sub-components/ProductItem/ProductItem";





const ProductListing = ({ data, productListStatus }) => {

    console.log("data", data, productListStatus)

    function renderProductList() {
        if (productListStatus === 'fetching') {
            return [...Array(9)].map((x, i) => {
                return <ProductItem key={i} productListStatus={productListStatus} />
            })
        } else if (productListStatus === 'success') {
            return data && data.map(product => {
                return <ProductItem key={product.slug} product={product} productListStatus={productListStatus} />
            })
        } else if (productListStatus === 'failure') {
            return <h1>No Products found ;-(</h1>
        }
    }

    return (

        <div className="container px-5 mx-auto">
            <div className="flex flex-wrap -m-4">


                {renderProductList()}


            </div>
        </div>
    )
};

export default ProductListing;