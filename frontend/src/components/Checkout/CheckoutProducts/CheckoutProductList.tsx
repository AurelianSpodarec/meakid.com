
import { useDispatch, useSelector } from 'react-redux'

import {
    closeCart,
    selectProducts,
    cartOpenState,
    selectTotalPrice
} from '../../../lib/slices/cartSlice'
import CheckoutProductItem from './CheckoutProductItem/CheckoutProductItem'

function CheckoutProductList() {
    const products = useSelector(selectProducts)

    return (
        <div>
            {
                products && products.map(product => {
                    return <CheckoutProductItem product={product} />
                })
            }
        </div>
    )
}

export default CheckoutProductList;