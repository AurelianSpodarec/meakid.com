import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"

// TODO: Change Localhost key for testing for productoin once deployed
const WooCommerce = new WooCommerceRestApi({
    url: 'https://api.meakid.co.uk',
    consumerKey: 'ck_1d89952178e58a0601a26820f2f101898300fe57',
    consumerSecret: 'cs_a366b0fa8f82f3518bc219197e5c230d62182bce',
    version: 'wc/v3',
    // axiosConfig: {
    //     headers: {
    //         Accept: "application/json"
    //     }
    // }
});

export default WooCommerce;