import WooCommerce from "../../services/woocommerce/config_woocommerce";


//Action Types
export const ADD_TO_CART = "Cart/ADD";
export const REMOVE_FROM_CART = "Cart/REMOVE";
export const CLEAR_CART = "Cart/CLEAR";




const FETCH_PRODUCT_REQUEST = 'FETCH_PRODUCT_REQUEST';
const FETCH_PRODUCT_SUCCESS = 'FETCH_PRODUCT_SUCCESS';
const FETCH_PRODUCT_FAILURE = 'FETCH_PRODUCT_FAILURE';


//Action Creator
export const addToCart = (id: number) => {
    return {
        type: ADD_TO_CART,
        id
    }
}

const fetchProductRequest = () => {
    return {
        type: FETCH_PRODUCT_REQUEST
    }
}

//  

const fetchProduct = () => {
    return function (dispatch) {
        WooCommerce('products/12')
            .then(response => {

            })
            .catch(error => {

            })
    }
}
