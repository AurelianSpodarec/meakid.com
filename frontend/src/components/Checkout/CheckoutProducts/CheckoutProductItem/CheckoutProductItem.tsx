
function CheckoutProductItem({ product }) {

    console.log("S", product)
    return (
        <div key={product.product_id} className="flex justify-between mb-4">

            <div className="flex">
                <div className="relative w-16">
                    <div className="text-center -mt-2 -mr-2 absolute w-5 h-5 bg-gray-700 text-white rounded-full top-0 right-0 text-sm">{product.quantity}</div>
                    <img src={product.product_image} />
                </div>
                <div className="ml-4">
                    <span className="font-bold">{product.product_title}</span>
                    <span className="text-sm">{product.attributes.pa_colors}</span>
                    <span className="text-sm">{product.attributes.pa_size}</span>
                </div>
            </div>



            <div className="flex font-bold text-sm">
                <span dangerouslySetInnerHTML={{ __html: `${product.currency}` }}></span>
                <span className="">{product.product_price.toFixed(2)}</span>
            </div>

        </div>
    )
}

export default CheckoutProductItem;