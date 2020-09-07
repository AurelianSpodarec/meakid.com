import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"

// TODO: Change Localhost key for testing for productoin once deployed
const WooCommerce = new WooCommerceRestApi({
    url: 'http://localhost:8888',
    consumerKey: 'ck_787dffc682b582a8ffdba699c000cc02c605438a',
    consumerSecret: 'cs_fc10bf914054f534dc2165df98997508e5a4a4ea',
    version: 'wc/v3'
});

export default WooCommerce;