import { createStore, applyMiddleware, combineReducers } from 'redux';

import thunkMiddleware from 'redux-thunk'
import { HYDRATE, createWrapper } from 'next-redux-wrapper'


import cartReducer from './cart/cart.reducer';

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}

const combinedReducer = combineReducers({
    cart: cartReducer
})

// const reducer = (state, action) => {
//     if (action.type === HYDRATE) {
//         const nextState = {
//             ...state, // use previous state
//             ...action.payload, // apply delta from hydration
//         }
//         if (state.count) nextState.count = state.count // preserve count value on client side navigation
//         return nextState
//     } else {
//         return combinedReducer(state, action)
//     }
// }

export const initStore = () => {
    return createStore(combinedReducer, bindMiddleware([thunkMiddleware]))
}

export const wrapper = createWrapper(initStore)