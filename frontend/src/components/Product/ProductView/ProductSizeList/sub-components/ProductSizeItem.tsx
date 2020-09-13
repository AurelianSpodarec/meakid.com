import { current } from "@reduxjs/toolkit"

function ProductSizeItem({ item, currentProduct, onSizeChange, selectedSize }) {


    console.log("box", item)
    // console.log("WWW", currentProduct.max_qty == "")
    return (
        // <button
        //     disabled={!item.inStock || !currentProduct.max_qty === ""}
        //     onClick={() => onSizeChange(item.size)}
        //     className={`
        //         ${selectedSize === item.size && "bg-black text-white"} 
        //         ${!item.inStock || !currentProduct.max_qty === "" || !currentProduct.max_qty === 0 && 'text-gray-400 bg-gray-200 cursor-default'} 
        //         flex-1 mx-1 border-2 border text-center leading-10`
        //     }
        // >
        //     {item.size}
        // </button>
        <button
            // disabled={!item.inStock || !currentProduct.max_qty === ""}
            onClick={() => onSizeChange(item.attributes.attribute_pa_size)}
            className={`
             ${selectedSize === item.attributes.attribute_pa_size && "bg-black text-white"} 
             ${item.max_qty === "" && 'text-gray-400 bg-gray-200 cursor-not-allowed'} 
             flex-1 mx-1 border-2 border text-center leading-10`
            }
        >
            {item.attributes.attribute_pa_size}
        </button>
    )
}

export default ProductSizeItem
