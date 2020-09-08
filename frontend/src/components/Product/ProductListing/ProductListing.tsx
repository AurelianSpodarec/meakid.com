import Link from "next/link";
import ProductItem from "../sub-components/ProductItem/ProductItem";





const ProductListing = ({ data, isLoading }) => {

    console.log("data", data.products, isLoading)

    function renderProductList() {


        // if (isLoading) {
        //     console.log(1)
        // } else if (data.products) {
        //     console.log(2)
        // } else {
        //     return "Nothing"
        // }

        // if (isLoading) {
        //     console.log(1)
        return [...Array(9)].map((x, i) => {
            return <ProductItem isLoading={true} />
            // return <h1>HE</h1>
            //     })
            // } else if (data.products) {
            //     return data.products.map(product => {
            //         <ProductItem product={product} isLoading={isLoading} />
        })
        // }
    }

    return (

        <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">


                {renderProductList()}


            </div>
        </div>
    )
};

export default ProductListing;