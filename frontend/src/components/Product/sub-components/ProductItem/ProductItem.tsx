import react, { useEffect, useState } from "react";
import Link from "next/link";


// If product is fetching, show loading state
// if product fetched, show the product component
// if it was fetched, but got no product, show a 'no products found' component. 


const ProductItem = ({ product, productListStatus, key }) => {
    // console.log("product/;", product, productListStatus)

    console.log("Product Data", product)

    const [productVariations, setProductVariations] = useState([])

    // Count how many images there are with different id e.g 40,40, 41, 43 - total is 3, because 40 is being counted as one time
    // Get all the images once, fetch it, get the color

    // When user hovers item, fetch the images
    // change featured image when the user hover over the image 
    // {
    //     color: "green",
    //     image: "url"
    // }
    // count array quantity

    function onHover() {
        console.log("hover")

    }

    function fetchProductImages() {

    }

    function getProductVariations() {
        if (product && product.product_variation.length === 0) return

        let productVariationsSet = new Set([])

        for (const productVariation of product.product_variation) {
            if (productVariation.attributes.attribute_pa_colors) {


                productVariationsSet.add(
                    productVariation.attributes.attribute_pa_colors = {
                        color: productVariation.attributes.attribute_pa_colors,
                        image_id: productVariation.image_id
                    }
                );


            }
        }

        setProductVariations(Array.from(productVariationsSet));
        console.log("ppppp", productVariations, productVariationsSet)

        // attributes - attribute_pa_colors | attributes_pa_size
        // image_id

        // {
        // color: "",
        // image_id: ""
        // }
    }



    function renderProductVariationImages() {
        return (
            <div>

                {/* loading while fetching images */}
                <div className="bg-gray-500 inline-block">
                    <svg className="animate-spin  m-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                </div>

            </div >
        )
    }

    function renderFeaturedImage() {
        return (
            <img className="absolute object-cover object-center w-full h-full block" src={product.featured_image} />
        )
    }

    function renderPrice() {
        return (
            <p className="text-gray-900 font-semi-bold text-base">
                {
                    product.variation_price === "" ?
                        <span dangerouslySetInnerHTML={{ __html: `${product.currency}${parseInt(product.price).toFixed(2)}` }} />
                        :
                        product.variation_price.min == product.variation_price.max ?
                            <span dangerouslySetInnerHTML={{ __html: `${product.currency}${parseInt(product.variation_price.min).toFixed(2)}` }} />
                            :
                            <span dangerouslySetInnerHTML={{ __html: `${product.currency}${parseInt(product.variation_price.min).toFixed(2)} - ${product.currency}${parseInt(product.variation_price.min).toFixed(2)}` }} />
                }

            </p>
        )

    }

    useEffect(() => {
        if (productListStatus === 'success') {
            getProductVariations()
        }
    }, [])


    if (productListStatus === 'fetching') {
        return (
            <div key={key} className="w-1/2 lg:w-1/3 rounded overflow-hidden px-2 mb-8">
                <section className="flex flex-wrap justify-center max-w-xl mx-auto">
                    <div className=" w-full animate-pulse">
                        <figure style={{ paddingBottom: '100%' }} className="shadow rounded-md hover:shadow-lg h-48 bg-gray-400 transform transition-all duration-500 hover:scale-110 hover:ease-out"></figure>

                        <div className="flex justify-between mt-4">
                            <p className="h-6 w-3/5 bg-gray-200 rounded-lg"></p>
                            <p className="h-6 w-24 bg-gray-200 rounded-lg"></p>
                        </div>
                    </div>
                </section>
            </div>
        )
    }

    else {
        return (
            <div onMouseEnter={onHover} key={product.name} className="w-1/2 lg:w-1/3 rounded overflow-hidden px-2 mb-8">
                <Link as={`/shop/${product.category}/${product.slug}`} href="/shop/[productCategory]/[productSlug]">
                    <a title={`/${product.category}/${product.slug}`}>

                        <div style={{ paddingBottom: '100%' }} className="block relative h-48 rounded overflow-hidden">
                            {renderFeaturedImage()}
                        </div>

                        <div className="py-2 flex flex-col lg:flex-row lg:justify-between">
                            <span className="text-gray-900 font-bold text-lg">{product.name}</span>
                            {renderPrice()}
                        </div>


                        <div>
                            {renderProductVariationImages()}
                        </div>


                    </a>
                </Link>
            </div>
        )
    }


};

export default ProductItem;