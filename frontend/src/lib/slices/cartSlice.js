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
        console.log(res)
        return res;
    }
)

export const sliceAddItem = createAsyncThunk(
    'cart/sliceAddItem',
    async (data, thunkAPI) => {
        return addItem(data)
    }
)

export const increaseItemQuantity = createAsyncThunk(
    'item/increaseItemQuantity',
    async (itemKey, itemQuantity, thunkAPI) => {
        const res = await fetch();

        return res;

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
        loading: true,
        error: null,
        open: false
    },
    reducers: {
        getCurrentProduct: (state, key) => {


        },
        openCart: (state) => {
            state.open = true
        },
        closeCart: (state) => {
            state.open = false
        },
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
            const index = state.products.findIndex(item => item.product_id === action.meta.arg.product_id);
            if (index >= 0) {
                state.products[index].quantity += 1
            }
        },
        [sliceAddItem.fulfilled]: (state, action) => {
            const index = state.products.findIndex(item => item.key === action.payload.key);
            if (index >= 0) {
                state.products[index].quantity = action.payload.quantity
            } else {
                state.products.unshift(action.payload)
            }
        },
        [deleteCartItem.fulfilled]: (state, action) => {
            const filteredProducts = state.products.filter(item => {
                return item.key !== action.meta.arg

            })
            state.products = filteredProducts
        },
    }
})

export const {
    openCart,
    closeCart,
    addItemToCart,
    removeItemFromCart,
    decreaseItemQuantity,
    clearCart,
    loadCard,
} = cartSlice.actions


export const selectProducts = (state) => state.cart.products

export const cartOpenState = (state) => state.cart.open

export const selectTotalPrice = state =>
    state.cart.products ?
        state.cart.products.reduce(
            (accumulator, product) => accumulator + (product.quantity * product.product_price), 0
        )
        : 0


export const selectTotalProductsQuantity = (state) => state.cart.products.length;



export default cartSlice.reducer