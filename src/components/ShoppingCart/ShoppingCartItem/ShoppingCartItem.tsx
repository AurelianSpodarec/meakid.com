import { useState, useEffect } from 'react';

import Link from 'next/link';


function ShoppingCartItem({ product }) {
    console.log("cart item prod", product)
    return (

        <div className="max-w-sm rounded overflow-hidden ">

            <Link as={`/product/${product.slug}`} href="/[product]/[product-view]">
                <div className="flex flex-row">


                    <img
                        className="object-cover"
                        style={{ height: '120px' }}
                        src={product.image.src}
                        title="Contemplative Reptile"
                        alt="Sunset in the mountains"
                    />

                    <div className="text-left">
                        <p >{product.name}</p>
                        <div dangerouslySetInnerHTML={{ __html: `${product.currency}${parseInt(product.price).toFixed(2)}` }}></div>
                    </div>

                </div>
            </Link>

        </div>


    );
}

export default ShoppingCartItem;