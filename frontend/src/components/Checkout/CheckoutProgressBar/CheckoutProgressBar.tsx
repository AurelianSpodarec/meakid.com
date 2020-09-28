import { Layout, Hero } from '../..';

const checkoutSteps = [
    {
        step: 1,
        name: "Cart",
        completed: false,

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
    },
    {
        step: 4,
        name: "Payment",
        completed: false,
    },
    {
        step: 5,
        name: "Complete",
        completed: false,
    }
]

function CheckoutBar() {



    return (
        <div>

        </div>
    )
}

export default CheckoutBar;