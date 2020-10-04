import { configureStore } from '@reduxjs/toolkit'

import cartReducer from './lib/slices/cartSlice'
import checkoutReducer from './lib/slices/checkoutSlice'

export default configureStore({
    reducer: {
        cart: cartReducer,
        checkout: checkoutReducer
    },
    devTools: true,
})