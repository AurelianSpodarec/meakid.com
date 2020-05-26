import { useState, useEffect } from 'react';

import Link from 'next/link';


// function getColors(colors) {
//     return colors.
// }


function ProducItem({ product }) {
    console.log("single prod", product)

    const [currentColor, setCurrentcolor] = useState(null);
    const [currentImage, setCurrentImage] = useState(null);

    const [colors, setColors] = useState(null);
    // set uniqu ecolors and map
    // function setUniqueColors() {
    //     let colorSet = new Set([]);
    //     for (const variation of product.variations) {
    //         if (variation.attributes.attribute_pa_color) {
    //             colorSet.add(variation.attributes.attribute_pa_color);
    //         }
    //     }

    //     setColors(Array.from(colorSet));

    // }


    function setUniquecolors() {
        if (product.custom_variations) {
            let colorSet = new Set([]);

            for (const variation of product.custom_variations) {
                if (variation.attributes.attribute_pa_color) {
                    colorSet.add(variation.attributes.attribute_pa_color);
                }
            }

            setColors(Array.from(colorSet));
        } else {
            setColors(product.color)
        }
    }


    function getImage() {

        if (product.custom_variations) {
            if (currentColor) {
                let obj = product && product.custom_variations.find(product => product["attributes"].attribute_pa_color === currentColor)
                console.log("SSD", obj.image)
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
    }, [])

    useEffect(() => {

        getImage()
    }, [currentColor])

    console.log("p", product)

    return (



        <div className="max-w-sm rounded overflow-hidden ">

            <Link as={`/product/${product.slug}`} href="/[product]/[product-view]">
                <div>
                    <img
                        className="w-full"
                        height="300px"
                        src={currentImage}
                        title="Contemplative Reptile"
                    />

                    <div className="px-6 py-4">
                        <div className="font-bold text-xl mb-2">{product.name}</div>
                        <p className="text-gray-700 text-base">
                            {product.price}
                        </p>
                    </div>

                </div>
            </Link>

            <div>
                {
                    product.color ?
                        <div className="h-5 w-5" style={{ backgroundColor: `${colors}` }}></div>
                        :

                        colors && colors.map((color, index) =>
                            <button onClick={() => setCurrentcolor(color)} key={index} style={{ border: color === currentColor ? "2px solid gray" : "", height: '50px', width: '50px', backgroundColor: `${color}` }}></button>
                        )

                }
            </div>

            <div>
                <button>Add to cart</button>
            </div>


        </div>


    );
}

export default ProducItem;