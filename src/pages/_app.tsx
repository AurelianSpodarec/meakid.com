import React from 'react'
import { AppProps } from 'next/app'
// import './../../styles/index.css'
import './../../styles/index.css';
import SiteLayout from '../components/SiteLayout';
import { withRouter } from 'next/router'

function MyApp({ Component, pageProps, router }: AppProps) {

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
        <SiteLayout>
            <Component {...pageProps} />
        </SiteLayout>
    )
}

export default withRouter(MyApp)