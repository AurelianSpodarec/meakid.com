import Link from "next/link";





const ProductListing = () => (
    <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-wrap -m-4">

            <div className="lg:w-1/4 md:w-1/2 p-4 w-full">
                <Link href="s">
                    <a title="">

                        <div className="block relative h-48 rounded overflow-hidden">
                            <img className="object-cover object-center w-full h-full block" src="" />
                        </div>
                    </a>
                </Link>
            </div>

        </div>
    </div>
);

export default ProductListing;