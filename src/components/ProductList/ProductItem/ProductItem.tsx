import { useState, useEffect } from 'react';

import Link from 'next/link';
import { getCustomColor } from '../../../utils/custom-colors';


function ProducItem({ product }) {
    // console.log("single prod", product)

    const [currentColor, setCurrentcolor] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);

    const [colors, setColors] = useState(null);

    function setUniquecolors() {
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
        setUniquecolors()
    }, [product])

    useEffect(() => {
        getImage()
    }, [currentColor, product])

    return (

        <div className="w-1/3 rounded overflow-hidden px-2 mb-16">
            <div>
                <div className="bg-white border rounded-lg overflow-hidden">
                    <div className="relative overflow-hidden pb-full">
                        <img className="absolute h-full w-full object-cover" src={currentImage ? currentImage : "https://via.placeholder.com/150"} />
                    </div>
                    <div className="p-6">
                        <div className="flex items-baseline">
                            <span className="inline-block bg-teal-200 text-teal-800 text-xs px-2 rounded-full uppercase font-semibold tracking-wide">New</span>
                            <div className="ml-2 text-gray-600 text-xs uppercase font-semibold tracking-wide">
                                sdfdsf
        </div>
                        </div>
                        <h4 className="mt-1 font-semibold text-lg leading-tight truncate">d</h4>
                        <div className="mt-1">
                            sd
                            <span className="text-gray-600 text-sm"> / wk</span>
                        </div>
                        <div className="mt-2 flex items-center">

                        </div>
                    </div>
                </div>
                {/* <figure className="">
                <Link as={`/product/${product.slug}`} href="/[product]/[product-view]">
                    <div className="h-full"> */}

                {/* <div className="relative pb-2/3">
                    <img
                        className="absolute w-full h-full object-cover"
                        src={currentImage ? currentImage : "https://via.placeholder.com/150"}
                        title="Contemplative Reptile"
                        alt="Sunset in the mountains"
                    />
                </div> */}


                {/* <div className="py-2">
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
            </div> */}

                {/* </div> */}
                {/* // </Link> */}

                {/* <div>
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
                                <div
                                    className={"h-4 w-4 rounded-full outline-none" + (color === currentColor ? " border border-solid border-2 border-gray-600" : "")}
                                    style={{ backgroundColor: `${getCustomColor(color)}` }}
                                />
                            </button>
                        )
                }
            </div> */}
                {/* // </figure> */}
            </div>
        </div>


    );
}

export default ProducItem;