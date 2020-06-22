
import { AppProps } from 'next/app'
// import './../../styles/index.css'
import './../../styles/index.css';
import SiteLayout from '../components/SiteLayout';
import { withRouter } from 'next/router'

import React from 'react'

import { Provider } from "react-redux";

import withRedux from "next-redux-wrapper";
import { initStore } from './../store/store';




import 'swiper/css/swiper.css';
// import { INCREMENT_COUNTER } from './../store/cart/cart.actions';

function MyApp({ Component, pageProps, route, store }: AppProps) {

    // if (router.pathname.startsWith('/contact')) {
    //     return (
    //         <SiteLayout>
    //             {/* <AccountSettingsLayout> */}
    //             <Component {...pageProps} />
    //                 Account
    //             {/* </AccountSettingsLayout> */}
    //         </SiteLayout>
    //     )
    // }

    return (
        // <Provider store={store}>
        <SiteLayout>
            <Component {...pageProps} />
        </SiteLayout>
        // </Provider>
    )
}

export default withRedux(initStore)(MyApp);