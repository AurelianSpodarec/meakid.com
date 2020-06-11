import {
    ADD_TO_CART,
    FETCH_PRODUCT_REQUEST,
    FETCH_PRODUCT_SUCCESS,
    FETCH_PRODUCT_FAILURE,
    REMOVE_FROM_CART
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

            let addedItem = state.items.find(item => item.id === action.payload.id)
            let exist = state.items.find(item => action.payload.id === item.id)

            if (exist) {
                addedItem.quantity += 1
                return {
                    ...state,
                    items: [...state.items]
                }
            } else {
                action.payload.quantity = 1;
                return {
                    ...state,
                    items: [...state.items, action.payload],
                }
            }

        case FETCH_PRODUCT_FAILURE:
            return {
                loading: false,
                items: [],
                error: action.payload
            }

        case REMOVE_FROM_CART:
            let newItems = state.items.filter(product => product.id !== action.payload);
            return {
                ...state,
                items: newItems
            }

        default:
            return { ...state };
    }

}

export default cartReducer;


// product = draft.items.find(
//     item =>
//         item.ID === action.payload.ID &&
//         item.productOptionID === action.payload.productOptionID
// );
// if (product) {
//     product.quantity === 1
//         ? draft.items.splice(draft.items.indexOf(product), 1)
//         : product.quantity--;
// }