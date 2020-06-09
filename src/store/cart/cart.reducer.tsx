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


        // return {
        //     ...state,
        //     items: [
        //         ...state.items,
        //         { 
        //             exist['quantity'] = state[action.payload.id] ? state[action.payload.id].quantity + 1 : 1,
        //         }
        //     ]
        // }

        // return {
        //     loading: false,
        //     error: "",

        // exist
        // ? 
        //     items:[...state.items, action.payload.quantity++]

        //     : 
        //     items: [...state.items, action.payload],

        // }




        case FETCH_PRODUCT_FAILURE:
            return {
                loading: false,
                items: [],
                error: action.payload
            }

        case ADD_TO_CART:

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