

//Action Types
export const ADD_TO_CART = "Cart/ADD";
export const REMOVE_FROM_CART = "Cart/REMOVE";
export const CLEAR_CART = "Cart/CLEAR";

//Action Creator
export const addToCart = (id: number) => {
    console.log("Actiion clickcikc");
    return {
        type: ADD_TO_CART,
        id
    }
}

// export const removeFromCart = () => ({

// });

// export const clearCart = () => ({

// });