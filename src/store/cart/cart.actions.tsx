import WooCommerce from "../../services/woocommerce/config_woocommerce";


//Action Types
export const ADD_TO_CART = "Cart/ADD";
export const REMOVE_FROM_CART = "Cart/REMOVE";
export const CLEAR_CART = "Cart/CLEAR";




export const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST';
export const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
export const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';



//Action Creator
export const addToCart = (id: number) => {
    console.log("Add to cart click actions")
    return async dispatch => {
        dispatch(fetchProduct(id));
        // dispatch(addItemIdToCart)
    }

}

export const removeFromCart = (id: number) => {

    return {
        type: REMOVE_FROM_CART,
        payload: id
    }
}


const fetchProductRequest = () => {
    return {
        type: FETCH_PRODUCT_REQUEST
    }
}
const fetchProductSuccess = users => {
    return {
        type: FETCH_PRODUCT_SUCCESS,
        payload: users
    }
}

const fetchUsersFailure = error => {
    return {
        type: FETCH_PRODUCT_FAILURE,
        payload: error
    }
}


//  

const fetchProduct = (id: number) => {
    return function (dispatch) {
        dispatch(fetchProductRequest())
        WooCommerce.get(`products/${id}`)
            .then(response => {
                const item = response.data;
                dispatch(fetchProductSuccess(item))
            })
            .catch(error => {
                dispatch(fetchUsersFailure(error.message))
            })
    }
}
