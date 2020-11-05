import CoCartRequest from "./../requests/request";


async function getCart() {
    const res = await CoCartRequest("get-cart?thumb=true", 'GET')
    return res;
}

async function clearCart() {
    const res = await CoCartRequest("clear", 'POST')
    return res;
}

export {
    getCart,
    clearCart
}