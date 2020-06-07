import { ADD_TO_CART } from './cart.actions';

const defaultState = {
    items: [],
    total: 0,
}

const cartReducer = (state = defaultState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            return {
                items: [...state.items, action.id]
            }
        default:
            return { ...state };
    }
};

export default cartReducer;