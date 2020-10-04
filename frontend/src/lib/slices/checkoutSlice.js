import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'


const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
        products: [],
        billingAddressAsDelivery: true,
        order: {
            payment_method: "",
            payment_method_title: "",
            set_paid: false,
            billing: {
                first_name: "",
                last_name: "",
                address_1: "",
                address_2: "",
                city: "",
                state: "",
                postcode: "",
                country: "",
                email: "",
                phone: "",
            },
            shipping: {
                first_name: "",
                last_name: "",
                address_1: "",
                address_2: "",
                city: "",
                state: "",
                postcode: "",
                country: "",
            },
            line_items: [],
            shipping_lines: [
                {
                    method_id: "flat_rate",
                    method_title: "Flat Rate",
                    total: 10
                }
            ]
        },
    },
    reducers: {
        updatePayment: (state, { payload }) => {

        },
        updateBilling: (state, { payload }) => {
            console.log(current(state.order))
            state.order.billing = { ...state.order.billing, ...payload };
        },
        updateShipping: (state, { payload }) => {
            state.order.shipping = { ...state.order.shipping, ...payload };
        },
        updateLineItems: (state, { payload }) => {
            state.order.line_items = { ...state.order.line_items, ...payload };
        }
    }
})

export const selectBillingInfo = (state) => state.checkout.order.billing
export const selectOrderInfo = (state) => state.checkout.order


export const {
    updateBilling,
    updateShipping,
    updateLineItems
} = checkoutSlice.actions



export default checkoutSlice.reducer