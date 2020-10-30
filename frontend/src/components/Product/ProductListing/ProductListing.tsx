import Link from "next/link";
import ProductItem from "./sub-components/ProductItem/ProductItem";


const ProductListing = ({ data, productListStatus }) => {

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
            {/* pagination */}

            <div className="flex justify-between">
                <div>
                    Previous - if first page don't display
                    </div>

                <div>
                    1 - first
                    </div>

                <div>
                    <div>
                        7
                        </div>
                    <div>
                        8 current
                        </div>
                    <div>
                        9
                        </div>
                </div>

                <div>
                    10 - last
                    </div>

                <div>
                    Next - if last page don't display
                    </div>
            </div>
        </div>
    )
};

export default ProductListing;