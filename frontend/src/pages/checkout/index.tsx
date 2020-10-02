import reac, { useState } from 'react';
import { Layout } from '../../components'
import CheckoutProgressBar from '../../components/Checkout/CheckoutProgressBar/CheckoutProgressBar';
import CheckoutStepInformation from '../../components/Checkout/steps/CheckoutStepInformation/CheckoutStepInformation';
import CheckoutStepShipping from '../../components/Checkout/steps/CheckoutStepShipping/CheckoutStepShipping';
import CheckoutStepComplete from '../../components/Checkout/steps/CheckoutStepComplete/CheckoutStepComplete';
import CheckoutStepPayment from '../../components/Checkout/steps/CheckoutStepPayment/CheckoutStepPayment';

function Checkout() {

    const [currentStep, setCurrentStep] = useState(2);

    function renderStep() {
        switch (currentStep) {
            case 2:
                return <CheckoutStepInformation />
                break;
            case 3:
                return <CheckoutStepShipping />
                break;
            case 4:
                return <CheckoutStepPayment />
                break;
            case 5:
                return <CheckoutStepComplete />
                break;
            default:
                return <CheckoutStepInformation />
        }
    }

    return (
        <Layout>
            <div className="container mx-auto px-4" style={{ maxWidth: '1150px' }}>
                <div className="grid grid-cols-12 gap-4">

                    <section className="col-span-7">
                        <div style={{ marginLeft: "-10%", width: '120%' }}>
                            <CheckoutProgressBar currentStep={currentStep} />
                        </div>

                        <div>
                            {renderStep()}
                        </div>
                    </section>

                    <aside className="col-span-5">

                        <div className="mb-4 pb-4 border-b">
                            <p>Products</p>
                        </div>



                        <div className="mb-4 pb-4 border-b">
                            <div className="flex justify-between">
                                <p>Subtotal</p>
                                <p>$202.00</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Shipping</p>
                                <p>Calculated at next step</p>
                            </div>
                        </div>

                        <div className="flex justify-between">
                            <div>
                                <p>Total</p>
                                <p className="text-sm">Including £24.54 in taxes</p>
                            </div>
                            <p className="text-black font-bold text-2xl">$202.00</p>
                        </div>
                    </aside>

                </div>
            </div>

        </Layout>
    )
}

export default Checkout;