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
        order: {
            "payment_method": "" || undefined,
            billing: {
                "first_name": "" || undefined
            }
        }
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