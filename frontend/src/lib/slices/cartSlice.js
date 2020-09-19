import { createSlice } from '@reduxjs/toolkit'
import { emitWarning } from 'process';

const initialState = {
    products: [], // product to display
    cartData: [], // Product id, product variation id, quantity
    cartCookie: "", //??? I guess we need a session right
    isCartOpen: false // sidebar cart open/close
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, id) => {
            // check if the item exists, if yes, add quantity +
            state.cartData = [...state.cartData, id]
            console.log("state cart", state.cartData)
            addToCartAsync()

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
            state.cartData = []
            state.products = []
        },
        loadCard: () => {

        }
    }
})

export const {
    addItemToCart,
    removeItemFromCart,
    increaseItemQuantity,
    decreaseItemQuantity,
    clearCart,
    loadCard
} = cartSlice.actions

export const selectProducts = (state) => state.cart.products

export const addToCartAsync = (id) => async (dispatch) => {

    const data = {
        "product_id": 44,
        "quantity": 1
    }
    const res = await fetch("http://localhost:8888/wp-json/cocart/v1/add-item", {
        "method": "POST",
        "credentials": 'include',
        "headers": {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        "body": JSON.stringify(data)
    }).then(res => res.json()).then(mess => console.log("!!!!", mess))



    console.log(res)
    // console.log("!!!!", res.json())
    // const content = await getResponseContent(res)

    // if (res.ok) {

    //     return content
    // }
    // console.log("@£@££@@££@", res)

}



export default cartSlice.reducer

const getResponseContent = async function (response) {
    const contentType = response.headers.get('Content-Type')

    if (contentType) {
        if (contentType.match('image')) {
            return await response.blob()
        }

        if (contentType.match('application/json')) {
            return await response.json()
        }

        if (contentType.match('application/zip')) {
            return await response.blob()
        }
    }
} 