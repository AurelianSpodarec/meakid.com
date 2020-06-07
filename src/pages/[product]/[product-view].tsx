import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import WooCommerce from './../../services/woocommerce/config_woocommerce';

import { addToCart } from './../../store/cart/cart.actions';


function ProductView({ product, cart, addToCart }: any) {


    const [quantity, setQuantity] = useState(1)

    console.log('product', product)

    console.log("cart", cart)

    return (
        <div className="container mx-auto px-4">
            <div className="grid grid-cols-12">

                <button onClick={() => addToCart(product.id)}>
                    ADDDD
                </button>
                <div>
                    $$$$$$$$$$$$$ Counter:
                </div>
                <div className="col-span-6">
                    {
                        <img src={product.variations ? product.variations[0].variation_gallery_images[0].src : product.image[0]} height="300px" />
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
                            <p>Stock quantity: {product.variations ? "load obj" : product.stock_quantity}</p>
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

const mapStateToProps = state => {
    return {
        cart: state.cart
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        addToCart: (id) => { dispatch(addToCart(id)) },
    }
};

ProductView.getInitialProps = async (ctx: any) => {
    return WooCommerce.get(`product/slug=${ctx.query['product-view']}/variations`)
        .then(response => ({ product: response.data }))
        .catch(error => ({ product: error }));
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductView);