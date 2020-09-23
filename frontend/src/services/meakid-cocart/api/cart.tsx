import CoCartRequest from "./../requests/request";


async function getCart() {
    const res = await CoCartRequest("get-cart?thumb=true", 'GET')
    return res;
}

export {
    getCart
}