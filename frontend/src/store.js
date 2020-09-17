import { configureStore } from '@reduxjs/toolkit'

import cartReducer from './lib/slices/cartSlice'

export default configureStore({
    reducer: {
        cart: cartReducer,
    },
    devTools: true,
})