import WooCommerceRestApi from "@woocommerce/woocommerce-rest-api"

const WooCommerce = new WooCommerceRestApi({
    url: 'http://localhost:8888',
    consumerKey: 'ck_14bc1d5dfe2ef575063dc21b96de63563284a187',
    consumerSecret: 'cs_75d6c167e18a7eaac8ed7bc3e5bf32ee660c0227',
    version: 'wc/v3'
});

export default WooCommerce;
