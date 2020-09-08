import Link from "next/link";





const ProductItem = ({ product, isLoading }) => {
    console.log(product, isLoading)

    if (isLoading) {
        return (
            <div className="w-1/2 lg:w-1/3 rounded overflow-hidden px-2 mb-8">
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
            <div className="w-1/2 lg:w-1/3 rounded overflow-hidden px-2 mb-8">

                <Link href="s">
                    <a title="">
                        <div className="block relative h-48 rounded overflow-hidden">
                            <img className="object-cover object-center w-full h-full block" src={product && product.featured_image} />
                        </div>

                        <div>
                            <h1>{product & product.name}</h1>
                        </div>
                    </a>
                </Link>
            </div>
        )
    }


};

export default ProductItem;