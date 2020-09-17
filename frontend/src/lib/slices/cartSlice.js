import { createSlice } from '@reduxjs/toolkit'

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
        addItemToCart: (id) => {

        },
        removeItemFromCart: (id) => {

        },
        increaseItemQuantity: (id, quantity) => {

        },
        decreaseItemQuantity: (id, quantity) => {

        },
        clearCart: () => {

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

export const addToCartAsync = (id) => (dispatch) => {
    // fetch add something
    dispatch(addToCart(id))

}

export default cartSlice.reducer