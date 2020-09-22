import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'

import {
    getItemByID,
    deleteItemByKey
} from '../../services/meakid-cocart/api/item';




export const fetchCart = createAsyncThunk(
    'cart/fetchCartStatus',
    async (thunkAPI) => {
        const res = await fetch('http://localhost:8888/wp-json/cocart/v1/get-cart?thumb=true', {
            "method": "GET",
            "credentials": 'include',
            "headers": {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
        }).then(res => res.json());
        console.log("fetchCart", res)
        return res;
    }
)


export const fetchCartItemById = createAsyncThunk(
    'cart/fetchByIdStatus',
    async (itemID, thunkAPI) => {
        const res = await getItemByID(itemID)
        return res;
    }

)

export const deleteCartItem = createAsyncThunk(
    'cart/deleteCartItem',
    async (itemKey, thunkAPI) => {
        console.log("WWWQQQQQWEQWEQWE@£@!£@!£!@£!@£")
        const res = await deleteItemByKey(itemKey);
        console.log("!!!!!!!!", res)
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
        console.log(res)
        return res;
    }
)



const initialState = {
    products: [],
    cartData: [],
    // loading: true,
    error: null,
    isCartOpen: false,
};

// const cartItemUpdate

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, id) => {

        },
        removeItemFromCart: (state, id) => {

        },
        increaseItemQuantity: (state, id, quantity) => {
            // increase up to the product in stock limit
        },
        decreaseItemQuantity: (state, id, quantity) => {
            // if quantity is 1 and you decrease it, stop at 1
        },
        clearCart: (state) => {

        },
        loadCard: () => {

        }
    },
    extraReducers: {
        // [fetchCartItemById.pending]: (state, action) => {
        //     const index = state.products.findIndex(item => item.key === action.payload.key);
        //     if (index >= 0) {
        //         state.products[index].quantity += 1
        //     } else {
        //         state.products.unshift(action.payload)
        //     }
        // },
        [deleteCartItem.fulfilled]: (state, action) => {
            return
            // const index = state.products.findIndex(item => item.key === action.payload.key);
            // if (index) {
            //     // state.products[index].key = action.payload.key
            // }
        },
        [fetchCartItemById.fulfilled]: (state, action) => {
            const index = state.products.findIndex(item => item.key === action.payload.key);
            if (index >= 0) {
                state.products[index].quantity = action.payload.quantity
            } else {
                state.products.unshift(action.payload)
            }
        },
        [fetchCart.fulfilled]: (state, action) => {
            console.log("WWW")
            Object.entries(action.payload).forEach(it => state.products.push(it[1]))
        }
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