import { current } from "@reduxjs/toolkit"

function ProductSizeItem({ size, currentProduct, onSizeChange, selectedSize }) {


    let empty = size && size.max_qty === "";
    let productSize = size && size.attributes.attribute_pa_size;

    return (
        <button
            disabled={empty}
            onClick={() => onSizeChange(productSize)}
            className={`
            ${selectedSize === productSize
                && selectedSize !== empty && "bg-black text-white"} 
            ${size && size.max_qty === "" && 'text-gray-400 bg-gray-200 cursor-not-allowed'} 
             flex-1 mx-1 border-2 border text-center leading-10 relative`
            }
        >
            {productSize}
            {empty &&
                <svg style={{ width: "100%", height: "100%", position: 'absolute', top: 0 }}>
                    <line x1="0" y1="100%" x2="100%" y2="0" style={{ stroke: "#e1e1e1", strokeWidth: 1 }}></line>
                </svg>
            }
        </button>
    )
}

export default ProductSizeItem

// 
// 