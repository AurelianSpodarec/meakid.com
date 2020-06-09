import {
    ADD_TO_CART,
    FETCH_PRODUCT_REQUEST,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAILURE
} from './cart.actions';

const defaultState = {
    items: [],
    total: 0,
    loading: false
}



const cartReducer = (state = defaultState, action) => {

    // let product = undefined;
    switch (action.type) {
        case FETCH_PRODUCT_REQUEST:
            return {
                ...state,
                loading: true
            }

        case FETCH_PRODUCT_SUCCESS:
            return {
                loading: false,
                item: [...state.items, action.payload],
                error: ""
            }

        case FETCH_PRODUCT_FAILURE:
            return {
                loading: false,
                items: [],
                error: action.payload
            }

        case ADD_TO_CART:

            // let exist = state.items.find(item => item.id === action.id)

            return {
                ...state,
                items: [...state.items, action.id]
            }


        default:
            return { ...state };
    }

}

export default cartReducer;

// If it already exist, then add quantity to