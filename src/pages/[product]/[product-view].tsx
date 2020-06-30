import React, { useState, useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import WooCommerce from './../../services/woocommerce/config_woocommerce';

import { addToCart } from './../../store/cart/cart.actions';


function ProductView({ product, cart, addToCart }: any) {


    const [quantity, setQuantity] = useState(1)

    console.log('product', product)

    console.log("cart", cart)

    return (
        <div className="mx-auto lg:px-12 lg:py-16">
            <div className="block lg:flex">

                <section className="w-full relative flex-1">
                    {
                        <img src={product.variations ? product.variations[0].image.url : product.image[0]} className="w-full" />
                    }
                </section>

                <section className="p-4 relative w-full lg:ml-24 lg:w-94 lg:p-0">

                    <div>
                        <h5 className="text-sm uppercase">Meakid Fabrics</h5>
                        <h1 className="text-xl uppercase color-gray-900 font-bold">{product.name}</h1>
                    </div>

                    <div className="my-4">
                        {/* <span>{product.price.toFixed(2)}</span> */}
                        <span className="text-xl text-gray-700">£15.00</span>
                    </div>

                    <div>
                        <div>
                            <h5>Select Size</h5>
                            <div>Size Guide</div>
                        </div>
                        <div>
                            Image variations
                        </div>
                    </div>

                    {/* <div>
                        <p> Weight: {product.weight} g/m2</p>
                        <p>Width: {product.width}</p>

                    </div> */}

                    <div>
                        <div className="mb-4">
                            <p>Stock quantity: {product.variations ? "load obj" : product.stock_quantity}</p>
                        </div>

                        <button onClick={() => addToCart(product.id)} className="bg-blue-600 w-full rounded-full uppercase py-4 text-xs hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">Add to cart</button>
                    </div>
                </section>
            </div>
        </div >
    )
}

ProductView.getInitialProps = async (ctx: any) => {
    return WooCommerce.get(`product/slug=${ctx.query['product-view']}/variations`)
        .then(response => ({ product: response.data }))
        .catch(error => ({ product: error }));
}

const mapDispatchToProps = {
    addToCart
}

const mapStateToProps = state => {
    return {
        cart: state.cart
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductView);