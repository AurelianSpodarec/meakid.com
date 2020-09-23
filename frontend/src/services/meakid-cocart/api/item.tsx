import CoCartRequest from "./../requests/request";


async function addItem(data) {
    const res = await CoCartRequest("add-item?thumb=true", 'POST', data)
    return res;
}

async function updateItemByKey(itemKey, data) {
    const res = await CoCartRequest("item", 'POST', { data })
    return res;
}

async function updateItemQuantity(itemKey, quantity) {
    const res = await CoCartRequest(`item?cart_item_key=${itemKey}&quantity=${quantity}`, 'DELETE');
    return res;
}

async function deleteItemByKey(itemKey) {
    const res = await CoCartRequest(`item?cart_item_key=${itemKey}`, 'DELETE');
    return res;
}

export {
    addItem,
    updateItemByKey,
    updateItemQuantity,
    deleteItemByKey
}