import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'

import {
    addItem,
    deleteItemByKey
} from '../../services/meakid-cocart/api/item';

import { getCart } from '../../services/meakid-cocart/api/cart';


export const fetchCart = createAsyncThunk(
    'cart/fetchCartStatus',
    async (thunkAPI) => {
        const res = await getCart();
        return res;
    }
)

export const sliceAddItem = createAsyncThunk(
    'cart/sliceAddItem',
    async (data, thunkAPI) => {
        return addItem(data)
    }
)


export const updateCartItem = createAsyncThunk(
    'cart/updateCartItem',
    async (itemKey, itemQuantity, thunkAPI) => {
        const res = await fetch("http://localhost:8888/wp-json/cocart/v1/add-item?thumb=true", {
            "method": "POST",
            "credentials": 'include',
            "headers": {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            "body": JSON.stringify(
                {
                    "cart_item_key": itemKey,
                    "quantity": itemQuantity,
                }
            )
        }).then(res => res.json());
        return res;
    }
)

export const deleteCartItem = createAsyncThunk(
    'cart/deleteCartItem',
    async (itemKey, thunkAPI) => {
        const res = await deleteItemByKey(itemKey);
        console.log("!!!!!!!!", res)
        return res;
    }
)




// const cartItemUpdate

const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        products: [],
        cartData: [],
        // loading: true,
        error: null,
        isCartOpen: false,
    },
    reducers: {
        addItemToCart: (state, id) => {

        },
        removeItemFromCart: (state, key) => {

        },
        increaseItemQuantity: (state, id, quantity) => {
            // increase up to the product in stock limit
        },
        decreaseItemQuantity: (state, id, quantity) => {
            // if quantity is 1 and you decrease it, stop at 1
        },
        clearCart: (state) => {

        },

    },
    extraReducers: {
        [fetchCart.fulfilled]: (state, action) => {
            let arr = [];
            Object.entries(action.payload).forEach(item => arr.push(item[1]))
            state.products = arr.reverse();
        },
        [sliceAddItem.pending]: (state, action) => {
            console.log(action)
            const index = state.products.findIndex(item => item.product_id === action.meta.arg.product_id);

            if (index >= 0) {
                state.products[index].quantity += 1
            }
        },
        [sliceAddItem.fulfilled]: (state, action) => {
            const index = state.products.findIndex(item => item.key === action.payload.key);
            console.log("rrrrr", index)
            if (index >= 0) {
                state.products[index].quantity = action.payload.quantity
            } else {
                state.products.unshift(action.payload)
            }
        },
        [deleteCartItem.fulfilled]: (state, action) => {
            const index = state.products.findIndex(item => item.key === action.payload.key);
            console.log("BBBBBB", action)
        },
    }
})

export const {
    addItemToCart,
    removeItemFromCart,
    increaseItemQuantity,
    decreaseItemQuantity,
    clearCart,
    loadCard,
} = cartSlice.actions

export const selectProducts = (state) => state.cart.products


export default cartSlice.reducer