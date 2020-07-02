import { useState, useEffect } from 'react';

import Link from 'next/link';
import { getCustomColor } from '../../../utils/custom-colors';


function ProducItem({ product }) {
    console.log("single prod", product)

    const [currentColor, setCurrentcolor] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);

    const [colors, setColors] = useState(null);
    const [images, setImages] = useState(null);


    const [variationImages, setVariationImages] = useState(null);
    console.log("imgm", images)


    // go though the colors and grab the immage and do
    // {
    //     color: 'green',
    //     image: 'url'
    // }    


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
        if (product.custom_variations.length !== 0) {
            setImages(
                Object.values(
                    product.custom_variations.reduce((acc, variation) => {
                        const color = variation.attributes.attribute_pa_color;

                        acc[color] = {
                            image: variation.image,
                            color,
                        };

                        return acc;
                    }, {})
                )
            );
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

        <div className="w-1/2 lg:w-1/3 rounded overflow-hidden px-2 mb-8">
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

                    <div className="py-2 flex flex-col lg:flex-row lg:justify-between">
                        <div className="text-gray-900 font-bold text-base">{product.name}</div>

                        <div className="inline-flex">
                            <p className="text-sm text-gray-900 font-semi-bold text-sm">
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
                                images && images.map((item, index) =>

                                    <button

                                        className={(item.color === currentColor ? " border-solid border-4 border-black-700" : "") + " hidden xl:inline-block border-2 border-gray-200 mr-1 outline-none"}
                                        onMouseEnter={() => setCurrentcolor(item.color)}
                                        key={index}

                                    >
                                        {
                                            <img
                                                className="h-8 w-8"
                                                src={item.image}
                                            />
                                        }

                                    </button>

                                )
                        }
                        {images &&
                            <p className="xl:hidden text-gray-500">
                                {images.length}
                                Colors
                        </p>
                        }

                    </div>

                </div>



            </Link>
        </div >




    );
}

export default ProducItem;