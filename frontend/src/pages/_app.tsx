import { Provider } from 'react-redux'
import Head from 'next/head'
import store from '../store'

import './../../styles/globals.css';
import { fetchCart } from '../lib/slices/cartSlice';

store.dispatch(fetchCart())

function MyApp({ Component, pageProps }) {
    return (

        <Provider store={store}>
            <Component {...pageProps} />
        </Provider>

    )
}

export default MyApp
