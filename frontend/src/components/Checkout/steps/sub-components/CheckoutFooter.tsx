import { useEffect, useState } from "react";

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

function CheckoutFooter({ currentStep, prevStep, nextStep, }) {

    const [prevStepObject, setPrevStepObject] = useState({})
    const [nextStepObject, setNextStepObject] = useState({})


    function getCurrentStepObject() {
        return checkoutSteps.find(step => step.step === currentStep)
    }

    const getNextStepObject = () => {
        const step = checkoutSteps.find(step => step.step === currentStep + 1)
        setNextStepObject(step)
    }

    const getPrevStepObject = () => {
        let step = checkoutSteps.find(step => step.step === currentStep - 1)
        setPrevStepObject(step)
    }

    useEffect(() => {
        getNextStepObject()
        getPrevStepObject()
    }, [currentStep])


    return (
        <div>
            <div className="flex justify-between mt-6 mb-10">
                <button onClick={prevStep} className="flex items-center text-gray-700 text-sm font-medium rounded hover:underline focus:outline-none">
                    <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
                    <span className="mx-2">Back to {prevStepObject && prevStepObject.name}</span>
                </button>

                <button onClick={nextStep} className="flex items-center rounded-full px-6 py-3 uppercase font-bold bg-black text-white text-sm font-medium rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                    <span>Continue to {nextStepObject.name}</span>
                    <svg className="h-5 w-5 mx-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </button>
            </div>

            <div className="text-center text-xs">
                <p>By placing your order you agree to Meakid's <a>Terms and Conditions</a>, <a>Privacy Notice</a> and <a>Cookie Policy</a>.</p>
            </div>
        </div>
    )
}

export default CheckoutFooter;