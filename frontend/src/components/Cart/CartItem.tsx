import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link';

const CartItem = ({ item }) => {

    console.log("item cart", item)

    let productSubtotal = item.product_price * item.quantity;
    return (
        <tr className="border borer-b">
            <td className="p-6 w-56">
                {/* <Link as={`/shop/${item.product_categories[0].slug}/${item.product_slug}`} href="/shop/[productCategory]/[productSlug]"> */}
                <a title="product item">
                    <img src={item.product_image} />
                </a>
                {/* </Link> */}
            </td>
            <td>
                {/* <Link as={`/shop/${item.product_categories[0].slug}/${item.product_slug}`} href="/shop/[productCategory]/[productSlug]"> */}
                <a title="product item">
                    <h3 className="font-bold">{item.product_name}</h3>
                </a>
                {/* </Link> */}
                <div>
                    <p>{item.attributes.pa_colors}</p>
                    <p>{item.attributes.pa_size}</p>
                    <p className="text-xs">{item.currency}{item.product_price.toFixed(2)} GBP</p>
                </div>
            </td>
            <td className="border text-center">
                {item.quantity}
            </td>
            <td className="border text-center">
                {item.currency}{productSubtotal.toFixed(2)}
            </td>
        </tr>
    )

};

export default CartItem;