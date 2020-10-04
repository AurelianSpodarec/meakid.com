import { Layout, Hero } from '../..';
import CheckoutProgressItem from './CheckoutProgressItem';

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



function CheckoutProgressBar({ currentStep }) {


    return (
        <div className="relative mb-12">
            <div className="flex justify-between w-full relative z-10">
                {
                    checkoutSteps.map(item =>
                        <CheckoutProgressItem
                            currentStep={currentStep}
                            step={item.step}
                            label={item.name}
                            completed={item.completed}
                            route={item.route}
                        />
                    )
                }
            </div>
            <div style={{
                "width": "80%",
                "left": "10%",
                "right": "0",
                "position": "absolute",
                "top": "calc(50% - 16px)"
            }} className="w-full bg-gray-200 rounded items-center align-middle  align-center flex-1">
                <div className="w-0 bg-gray-400 py-1 rounded w-full"></div>
            </div>

        </div >
    )
}

export default CheckoutProgressBar;