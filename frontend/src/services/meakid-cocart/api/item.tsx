import CoCartRequest from "./../requests/request";


async function getItemByID(itemID) {
    const res = await CoCartRequest("add-item?thumb=true", 'POST', {
        "product_id": itemID
    })
    return res;
}

async function updateItemByKey(itemKey, data) {
    const res = await CoCartRequest("item", 'POST', { data })
    return res;
}

async function deleteItemByKey(itemKey) {
    const res = await CoCartRequest(`item?cart_item_key=${itemKey}`, 'DELETE');
    return res;
}

export {
    getItemByID,
    updateItemByKey,
    deleteItemByKey
}