import ProducItem from "../ProductItem";

function ProductList({ products }) {
    return (
        products.products && products.products.length ?
            products.products.map((product, index) => {
                return <ProducItem key={index} product={product} />
            })
            : 'Loading'
    )
}

export default ProductList;