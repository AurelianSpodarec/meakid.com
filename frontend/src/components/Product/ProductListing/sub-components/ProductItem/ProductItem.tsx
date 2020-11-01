import react, { useEffect, useState } from "react";
import Link from "next/link";
import WooCommerce from "../../../../../services/meakid-wordpress/config_meakid_woocommerce";


// If product is fetching, show loading state
// if product fetched, show the product component
// if it was fetched, but got no product, show a 'no products found' component. 



const ImageItem = ({ id, url, productVariations, onMouseEnter }: any) => {

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false)
    }, [url])

    return (


        <div onMouseEnter={onMouseEnter} className="bg-gray-500 inline-block mr-1">

            {
                loading ?

                    <svg className="animate-spin m-1 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    :
                    <div className="h-8 w-8">
                        <img src={url} />
                    </div>
            }

        </div>


    )

}

const ImageList = ({ imageVariation, changeFeaturedImage }: any) => {
    return (
        <div className="bg-gray-500 inline-block mr-1">
            {
                imageVariation.map(url => {
                    return <ImageItem url={url} onMouseEnter={() => changeFeaturedImage(url)} />
                })
            }
        </div>
    )
}


const ProductItem = ({ product, productListStatus, key }: any) => {
    // console.log("Product Data", product)

    const [productVariations, setProductVariations] = useState([])
    const [imageVariation, setImageVariation] = useState([])

    const [featuredImage, setFeaturedImage] = useState()

    const [imageVariationFetched, setImageVariationFetched] = useState(false)


    function getProductVariations() {
        if (product && product.product_variation.length === 0) return

        let productVariationsSet = new Set([])

        const filteredArr = product.product_variation.filter(el => {
            const duplicate = productVariationsSet.has(el.attributes.attribute_pa_colors);
            productVariationsSet.add(el.attributes.attribute_pa_colors);
            return !duplicate;
        });

        setProductVariations(Array.from(filteredArr));
        // console.log("ppppp", filteredArr, productVariationsSet)
    }


    function onHover() {
        if (!imageVariationFetched) {
            getProductVariations()
            setImageVariationFetched(true);
        }
    }

    useEffect(() => {
        if (productListStatus === 'success') {
            setFeaturedImage(product.featured_image)
        }
    }, [])

    useEffect(() => {
        fetchProductImages()
    }, [productVariations])

    async function fetchProductImages() {
        for (const i in productVariations) {
            let res = await WooCommerce.get(`image/${productVariations[i].image_id}`)
            setImageVariation(imageVariation => [...imageVariation, res.data[0]])
        }

    }


    function changeFeaturedImage(url) {
        setFeaturedImage(url)
    }

    const renderImagesVariation = () => {
        return (
            <div>
                <p>Colors: {productVariations.length}</p>
                {/* <ImageList imageVariation={imageVariation} changeFeaturedImage={changeFeaturedImage} /> */}

                <div className="bg-gray-500 inline-block mr-1">
                    {
                        imageVariation.map((url, index) => {
                            return <ImageItem key={index} url={url} onMouseEnter={() => changeFeaturedImage(url)} />
                        })
                    }
                </div>
            </div>
        )
    }


    function renderFeaturedImage() {
        return (
            <img className="absolute object-cover object-center w-full h-full block" src={featuredImage} />
        )
    }


    function renderPrice() {
        return (
            <p className="text-gray-900 font-semi-bold text-base">
                {
                    product.variation_price === "" ?
                        <span dangerouslySetInnerHTML={{ __html: `${product.currency}${parseFloat(product.price).toFixed(2)}` }} />
                        :
                        product.variation_price.min == product.variation_price.max ?
                            <span dangerouslySetInnerHTML={{ __html: `${product.currency}${parseFloat(product.variation_price.min).toFixed(2)}` }} />
                            :
                            <span dangerouslySetInnerHTML={{ __html: `${product.currency}${parseFloat(product.variation_price.min).toFixed(2)} - ${product.currency}${parseFloat(product.variation_price.max).toFixed(2)}` }} />
                }

            </p>
        )

    }



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
            <div onMouseEnter={onHover} key={product.id} className="w-1/2 lg:w-1/3 rounded overflow-hidden px-2 mb-8">
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
                            {renderImagesVariation()}
                        </div>


                    </a>
                </Link>
            </div>
        )
    }


};

export default ProductItem;