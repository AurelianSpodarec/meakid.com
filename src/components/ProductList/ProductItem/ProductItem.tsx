import { useState, useEffect } from 'react';

import Link from 'next/link';
import { getCustomColor } from '../../../utils/custom-colors';


function ProducItem({ product }) {
    // console.log("single prod", product)

    const [currentColor, setCurrentcolor] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);

    const [colors, setColors] = useState(null);
    const [images, setImages] = useState(null);
    // console.log(images)
    function setUniqueColors() {
        setColors(null)

        if (product.custom_variations.length !== 0) {
            let colorSet = new Set([]);

            for (const variation of product.custom_variations) {
                if (variation['attributes'].attribute_pa_color) {
                    colorSet.add(variation.attributes.attribute_pa_color);
                }
            }

            setColors(Array.from(colorSet));
        } else {
            // setColors(product.color)
        }
    }

    function setUniqueImages() {
        setImages(null)

        if (product.custom_variations.length !== 0) {
            let imagesSet = new Set([]);

            for (const variation of product.custom_variations) {
                if (variation.image) {
                    imagesSet.add(variation.image);
                }
            }

            setImages(Array.from(imagesSet));
        } else {
            // setColors(product.color)
        }
    }

    function getImage() {
        setCurrentImage(null)
        if (product.custom_variations.length !== 0) {
            if (currentColor) {
                let obj = product && product.custom_variations.find(product => product["attributes"].attribute_pa_color === currentColor)
                setCurrentImage(obj.image)
            } else {
                setCurrentImage(product.custom_variations[0].image)
            }
        } else {
            let obj = product.image[0]
            setCurrentImage(obj)
        }
    }

    useEffect(() => {
        setUniqueColors()
        setUniqueImages()
    }, [product])

    useEffect(() => {
        getImage()
    }, [currentColor, product])

    return (

        <div className="w-1/3 rounded overflow-hidden px-2 mb-8">
            <Link as={`/product/${product.slug}`} href="/[product]/[product-view]">
                <div className="h-full">


                    <div className="relative overflow-hidden pb-full">
                        <img
                            className="absolute h-full w-full object-cover"
                            src={currentImage ? currentImage : "https://via.placeholder.com/150"}
                            title="Contemplative Reptile"
                            alt="Sunset in the mountains"
                        />
                    </div>

                    <div className="py-2 flex justify-between">
                        <div className="text-xl text-gray-900 font-bold text-xl">{product.name}</div>

                        <div className="inline-flex">
                            <p className="text-sm text-gray-600 text-base">
                                {
                                    product.variationPrice === "" ?
                                        <span>
                                            <div dangerouslySetInnerHTML={{ __html: `${product.currency}${parseInt(product.price).toFixed(2)}` }}></div>
                                        </span> :
                                        <span>
                                            {
                                                product.variationPrice.min == product.variationPrice.max ?
                                                    <p dangerouslySetInnerHTML={{ __html: `${product.currency}${parseInt(product.variationPrice.min).toFixed(2)}` }} />
                                                    :
                                                    <p dangerouslySetInnerHTML={{ __html: `${product.currency}${parseInt(product.variationPrice.min).toFixed(2)} - ${product.currency}${parseInt(product.variationPrice.min).toFixed(2)}` }} />
                                            }
                                        </span>
                                }
                            </p>
                        </div>
                    </div>

                    <div>
                        {
                            product.color && colors === null ?
                                <div className="h-5 w-5" style={{ backgroundColor: `${colors}` }}></div>
                                :
                                colors && colors.map((color, index) =>
                                    <button

                                        className={(color === currentColor ? "border border-solid border-4 border-black-700" : "") + " border-2 border-gray-200 rounded-full mr-1 outline-none"}
                                        // onClick={() => setCurrentcolor(color)}
                                        onMouseEnter={() => setCurrentcolor(color)}
                                        key={index}

                                    >
                                        {/* <div
                                            className={"h-4 w-4 rounded-full outline-none" + (color === currentColor ? " border border-solid border-2 border-gray-600" : "")}
                                            style={{ backgroundColor: `${getCustomColor(color)}` }}
                                        /> */}
                                        {/* <img
                                            src={product.}
                                        /> */}

                                        {
                                            images && images.map((image, x) => {
                                                return <img
                                                    className="h-8 w-8"
                                                    src={image}
                                                />
                                            })
                                        }


                                    </button>
                                )
                        }
                    </div>

                </div>



            </Link>
        </div >




    );
}

export default ProducItem;