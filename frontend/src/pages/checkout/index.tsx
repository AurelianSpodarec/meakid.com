import reac, { useState } from 'react';
import { Input, Layout } from '../../components'

import CheckoutProgressBar from '../../components/Checkout/CheckoutProgressBar/CheckoutProgressBar';
import CheckoutStepInformation from '../../components/Checkout/steps/CheckoutStepInformation/CheckoutStepInformation';
import CheckoutStepShipping from '../../components/Checkout/steps/CheckoutStepShipping/CheckoutStepShipping';
import CheckoutStepComplete from '../../components/Checkout/steps/CheckoutStepComplete/CheckoutStepComplete';
import CheckoutStepPayment from '../../components/Checkout/steps/CheckoutStepPayment/CheckoutStepPayment';
import CheckoutProductList from '../../components/Checkout/CheckoutProducts/CheckoutProductList';

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

                    <section className="col-span-7 pr-20">
                        <div style={{ marginLeft: "-10%", width: '120%' }}>
                            <CheckoutProgressBar currentStep={currentStep} />
                        </div>

                        <div>
                            {renderStep()}
                        </div>
                    </section>

                    <aside className="col-span-5 pl-10 border-l" style={{ background: "#fafafa" }}>
                        <div>
                            <div className="mb-4 pb-4 border-b">
                                <CheckoutProductList />
                            </div>

                            <div className="flex mb-4 pb-4 border-b">
                                <Input placeholder="Discount code" />
                                <button
                                    style={{ backgroundColor: "#ebebeb", color: "#6E6E6E" }}
                                    disabled={true}
                                    className="rounded-full uppercase font-bold text-sm my-2 ml-3 px-8 disabled">Apply</button>
                            </div>

                            <div className="mb-4 pb-4 border-b">
                                <div className="flex justify-between">
                                    <p>Subtotal</p>
                                    <p>$202.00</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Shipping</p>
                                    <p className="text-xs">Calculated at next step</p>
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm font-bold">Total</p>
                                    <p className="text-xs">Including £24.54 in taxes</p>
                                </div>
                                <p className="text-black font-bold text-2xl">$202.00</p>
                            </div>
                        </div>
                    </aside>

                </div>
            </div>

        </Layout>
    )
}

export default Checkout;