import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'


export const fetchCart = createAsyncThunk(
    'cart/fetchCartStatus',
    async (thunkAPI) => {
        const res = await getCart();
        return res;
    }
)

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
        products: [],
    },
    reducers: {
        getCurrentProduct: (state, key) => {


        },

    },

})

export const {
    openCheckout,

} = checkoutSlice.actions



export default checkoutSlice.reducer