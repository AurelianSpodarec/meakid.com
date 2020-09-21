import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'




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
    async (userID, thunkAPI) => {
        const res = await fetch("http://localhost:8888/wp-json/cocart/v1/add-item?thumb=true", {
            "method": "POST",
            "credentials": 'include',
            "headers": {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            "body": JSON.stringify({ "product_id": userID })
        }).then(res => res.json());
        console.log(res)
        return res;
    }
)

const initialState = {
    products: [],
    cartData: [],
    cartCookie: "",
    isCartOpen: false
};

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
        [fetchCartItemById.fulfilled]: (state, action) => {

            // check if exist, if it does, replace it with new
            let existItem = state.products.find(item => console.log(item.key) === action.payload.key);
            console.log("Ssss", state.products)


            if (state.products.find(item => item.key === action.payload.key)) {
                // state.products[existItem].quantity + 1
                return;
            } else {
                state.products.unshift(action.payload)
            }
        },
        [fetchCart.fulfilled]: (state, action) => {
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



// const fetchCart = async () => {
//     await getCart()
// }


// useEffect(() => {
//     fetchCart()
// }, [])

// export const addToCartAsync = (id) => async (dispatch) => {
//     console.log("addToCartAsync")

//     const data = {
//         "product_id": 46,
//         "quantity": 1
//     }
//     const res = await fetch("http://localhost:8888/wp-json/cocart/v1/add-item", {
//         "method": "POST",
//         "credentials": 'include',
//         "headers": {
//             'Content-Type': 'application/json',
//             'Accept': 'application/json'
//         },
//         "body": JSON.stringify(data)
//     })
//         .then(res => res.json())
//         .then(mess => console.log("!!!!", mess))

//     // console.log(res)
// }





export default cartSlice.reducer