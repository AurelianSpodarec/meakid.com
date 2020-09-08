import Link from "next/link";


// If product is fetching, show loading state
// if product fetched, show the product component
// if it was fetched, but got no product, show a 'no products found' component. 


const ProductItem = ({ product, productListStatus, key }) => {
    // console.log("product/;", product, productListStatus)

    if (productListStatus === 'fetching') {
        return (
            <div key={key} className="w-1/2 lg:w-1/3 rounded overflow-hidden px-2 mb-8">
                <section className="flex flex-wrap justify-center max-w-xl mx-auto">
                    <div className=" w-full animate-pulse">
                        <figure style={{ paddingBottom: '100%' }} className="shadow rounded-md hover:shadow-lg h-48 bg-gray-400 transform transition-all duration-500 hover:scale-110 hover:ease-out"></figure>

                        <div className="flex justify-between mt-4">
                            {/* /  <section className="flex items-center w-1/2 space-x-2"> */}
                            {/* <figure className="bg-gray-200 rounded-full h-3 w-4"></figure> */}
                            <p className="h-6 w-3/5 bg-gray-200 rounded-lg"></p>
                            <p className="h-6 w-24 bg-gray-200 rounded-lg"></p>
                            {/* </section> */}
                        </div>
                    </div>
                </section>
            </div>
        )
    }

    else {
        return (
            <div key={product.name} className="w-1/2 lg:w-1/3 rounded overflow-hidden px-2 mb-8">
                <Link href="s">
                    <a title="">

                        <div style={{ paddingBottom: '100%' }} className="block relative h-48 rounded overflow-hidden">
                            <img className="absolute object-cover object-center w-full h-full block" src={product.featured_image} />
                        </div>

                        <div className="py-2">
                            <span className="text-gray-900 font-bold text-base">{product.name}</span>
                        </div>

                    </a>
                </Link>
            </div>
        )
    }


};

export default ProductItem;