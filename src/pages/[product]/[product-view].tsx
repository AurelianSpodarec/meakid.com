import React, { useState, useEffect, useMemo } from 'react';



import WooCommerce from './../../services/woocommerce/config_woocommerce';

function ProductView({ product }: any) {

    const [quantity, setQuantity] = useState(1)

    console.log('product', product)

    function updateQuantity() {

    }

    function addQuantity() {

    }

    function subtractQuantity() {

    }

    function checkQuantity() {
        // Only numbers, no more than stock value or below 1
    }

    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-12">

                <div className="col-span-6">
                    {
                        <img src={product.variations ? product.variations[0].variation_gallery_images[0].src : product.image[0]} height="300px" />
                        //     product.variations[0].variation_gallery_images.map((product, index) => {
                        //         return <img
                        //     key={index}
                        //     src={product.url}
                        //     height="300px"
                        //     title="Contemplative Reptile"
                        // />

                    }
                </div>

                <div className="col-span-6">

                    <div>
                        <h2>{product.name}</h2>
                        <span>{product.price}</span>
                    </div>

                    <div>
                        <p> Weight: {product.weight} g/m2</p>
                        <p>Width: {product.width}</p>

                    </div>

                    <div>
                        <div className="mb-4">
                            <p>{product.stock_quantity}</p>
                            <span className="h-5 w-5 inline-block text-center align-middle cursor-pointer bg-black text-white">-</span>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Quantity" value={`${quantity}m`} />
                            <span className="h-5 w-5 inline-block text-center align-middle cursor-pointer bg-black text-white">+</span>
                        </div>



                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Add to cart</button>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default ProductView;


ProductView.getInitialProps = async (ctx: any) => {


    // console.log("Query Single Product", WooCommerce.get('route').then(res => ({ p: res.data })))
    // return WooCommerce.get(`product/slug=${ctx.query['single-product']}`)
    return WooCommerce.get(`product/slug=${ctx.query['product-view']}/variations`)
        // return WooCommerce.get(`products/${ctx.query['single-product']}`)
        .then(response => ({ product: response.data }))
        .catch(error => ({ product: error }));
}