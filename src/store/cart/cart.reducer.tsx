import { ADD_TO_CART } from './cart.actions';

const defaultState = {
    items: [],
    total: 0,
}

const cartReducer = (state = defaultState, action) => {
    let product = undefined;

    switch (action.type) {
        case ADD_TO_CART:

            let exist = state.items.find(item => item.id === action.id)

            exist
                ? product.quantity++
                : product.quantity = 0


            return {
                ...state,
                items: [...state.items, action.id]
            }


        default:
            return { ...state };
    }
};

export default cartReducer;

// If it already exist, then add quantity to it