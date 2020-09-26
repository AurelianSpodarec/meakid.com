import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link';

const CartItem = ({ item }) => {

    console.log("item cart", item)

    let productSubtotal = item.product_price * item.quantity;
    return (
        <tr className="">
            <td>
                {/* <Link as={`/shop/${item.product_categories[0].slug}/${item.product_slug}`} href="/shop/[productCategory]/[productSlug]"> */}
                <a title="product item">
                    <img src={item.product_image} />
                </a>
                {/* </Link> */}
            </td>
            <td>
                {/* <Link as={`/shop/${item.product_categories[0].slug}/${item.product_slug}`} href="/shop/[productCategory]/[productSlug]"> */}
                <a title="product item">
                    <h2>{item.product_name}</h2>
                </a>
                {/* </Link> */}
                <div>
                    <p>Size</p>
                    <span>{item.currency}{item.product_price.toFixed(2)}</span>
                </div>
            </td>
            <td>
                Quantity
                {item.quantity}
            </td>
            <td>
                {item.currency}{productSubtotal.toFixed(2)}
            </td>
        </tr>
    )

};

export default CartItem;