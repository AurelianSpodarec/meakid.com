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

export {
    checkoutSteps
}