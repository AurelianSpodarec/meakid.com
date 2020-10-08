import { createAsyncThunk, createSlice, current } from '@reduxjs/toolkit'
const checkoutSteps = [
    {
        step: 1,
        name: "Cart",
        completed: false,
        route: "/cart"

    },
    {
        step: 2,
        name: "Information",
        completed: false,
        route: "/contact-info"
    },
    {
        step: 3,
        name: "Shipping",
        completed: false,
        route: "/checkout-shipping"
    },
    {
        step: 4,
        name: "Payment",
        completed: false,
        route: "/checkout-payment"
    },
    {
        step: 5,
        name: "Complete",
        completed: false,
        route: "/checkout-complete"
    }
]

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState: {
        products: [],
        billingAddressAsDelivery: true,
        step: 2,
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
        },
        nextStep: (state) => {
            // const step = checkoutSteps.find(step => step.step === currentStep + 1)
            state.step = state.step + 1
        },
        prevStep: (state) => {
            // const step = steps.find(step => step.step === currentStep - 1)
            state.step = state.step - 1
        }
    }
})

export const selectCheckoutStep = (state) => state.checkout.step
export const selectBillingInfo = (state) => state.checkout.order.billing
export const selectOrderInfo = (state) => state.checkout.order
export const selectCheckout = (state) => state.checkout
// export const selectShippingLines = (state) => state.shipping_lines

export const {
    updateBilling,
    updateShipping,
    updateLineItems,
    nextStep,
    prevStep
} = checkoutSlice.actions



export default checkoutSlice.reducer