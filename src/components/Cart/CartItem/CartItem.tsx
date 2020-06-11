import { useState, useEffect } from 'react';

import Link from 'next/link';


function CartItem({ product }) {
    // console.log("single prod", product)
    return (

        <div className="max-w-sm rounded overflow-hidden ">

            <Link as={`/product/${product.slug}`} href="/[product]/[product-view]">
                <div>

                    <img
                        className="w-full object-cover"
                        style={{ height: '250px' }}
                        src={product.images[0].src}
                        title="Contemplative Reptile"
                        alt="Sunset in the mountains"
                    />

                    <div>
                        <div>ID: {product.id}</div>
                        <fib>Name: {product.name}</fib>
                    </div>

                </div>
            </Link>

        </div>


    );
}

export default CartItem;