import reac, { useEffect, useState } from 'react';
import { Input, Layout } from '../../components'

import CheckoutProgressBar from '../../components/Checkout/CheckoutProgressBar/CheckoutProgressBar';
import CheckoutStepInformation from '../../components/Checkout/steps/CheckoutStepInformation';
import CheckoutStepShipping from '../../components/Checkout/steps/CheckoutStepShipping';
import CheckoutStepComplete from '../../components/Checkout/steps/CheckoutStepComplete';
import CheckoutStepPayment from '../../components/Checkout/steps/CheckoutStepPayment';
import CheckoutProductList from '../../components/Checkout/CheckoutProducts/CheckoutProductList';

import PaypalExpressBtn from 'react-paypal-express-checkout';


// import { PayPalButton } from "react-paypal-button-v2";

import {
    prevStep,
    nextStep,
    selectCheckoutStep
} from './../../lib/slices/checkoutSlice'

import { useDispatch, useSelector } from 'react-redux'
import { current } from 'immer';

import {
    selectProducts,
    selectTotalPrice
} from './../../lib/slices/cartSlice'



// Create an order with the items and put in the checkout


function Checkout() {
    const [paypalLoaded, setPaypalLoaded] = useState(false);
    const dispatch = useDispatch();

    const products = useSelector(selectProducts)
    const totalPrice = useSelector(selectTotalPrice)

    const currentStep = useSelector(selectCheckoutStep)
    console.log(currentStep)
    // const [currentStep, setCurrentStep] = useState(2);
    const [currentStepObject, setCurrentStepObject] = useState()

    const [a, setA] = useState(false)

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

    let env = 'sandbox';
    const client = {
        sandbox: 'AThdpf2emcPZ1oqK01u4sYDShPqaTxBxl3PFqRruAuFJu0k0NX6r9Bb-4f0zy78-Dn7RsZRNVF9AUBWu',
        // production: 'YOUR-PRODUCTION-APP-ID',
    }

    return (
        <Layout>
            <div className="container mx-auto px-4" style={{ maxWidth: '1150px' }}>
                <div className="grid grid-cols-12 gap-4">

                    <section className="col-span-12 lg:col-span-7 lg:pr-20">
                        {/* <div style={{ marginLeft: "-10%", width: '120%' }}>
                            <CheckoutProgressBar checkoutSteps={checkoutSteps} currentStep={currentStep} />
                        </div>

                        <div>
                            {renderStep()}
                        </div> */}
                        <CheckoutProductList />
                    </section>

                    <aside className="checkout-sidebar  col-span-12 lg:col-span-5  pl-10 border-l" style={{ background: "#fafafa" }}>
                        <div>
                            <div className="mb-4 pb-4 border-b">
                                {/* <CheckoutProductList /> */}
                            </div>

                            {/* <div className="flex mb-4 pb-4 border-b">
                                <Input placeholder="Discount code" />
                                <button
                                    style={{ backgroundColor: "#ebebeb", color: "#6E6E6E" }}
                                    disabled={true}
                                    className="rounded-full uppercase font-bold text-sm my-2 ml-3 px-8 disabled">Apply</button>
                            </div> */}

                            <div className="mb-4 pb-4 border-b">
                                <div className="flex justify-between">
                                    <p>Subtotal</p>
                                    <p>£{totalPrice.toFixed(2)} GBP</p>
                                </div>
                                <div className="flex justify-between">
                                    <p>Shipping</p>
                                    <p className="text-xs">Calculated at next step</p>
                                </div>
                            </div>

                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm font-bold">Total</p>
                                    {/* <p className="text-xs">Including £24.54 in taxes</p> */}
                                    <p className="text-xs">Including £2.00 in shipping</p>
                                </div>
                                <p className="text-black font-bold text-2xl"></p>
                            </div>
                            {/* {paypalLoaded
                                ?

                                <PayPalButton
                                    onButtonReady={() => {
                                        setPaypalLoaded(true);
                                    }}
                                    // amount={totalPrice}
                                    //     options={{
                                    //         clientId: PAYPAL_CLIENT_ID,
                                    // }}
                                    client-id="sb"
                                    amount="1"
                                    // client-id="AitrTCFT4OMoUacOiZjcQMGiIe1GAoupsPAP.yEseCv8dcL9dDNKGVsF"
                                    currency="GBP"
                                    // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                    onSuccess={(details, data) => {
                                        alert("Transaction completed by " + details.payer.name.given_name);

                                        // OPTIONAL: Call your server to save the transaction
                                        console.log(details)
                                    }}
                                /> : null} */}
                            {/* <PayPalButton

                                // amount={totalPrice}
                                //     options={{
                                //         clientId: PAYPAL_CLIENT_ID,
                                // }}
                                // client-id="sb"
                                amount="1"
                                client-id="AThdpf2emcPZ1oqK01u4sYDShPqaTxBxl3PFqRruAuFJu0k0NX6r9Bb-4f0zy78-Dn7RsZRNVF9AUBWu"
                                // currency="GBP"
                                // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                onSuccess={(details, data) => {
                                    alert("Transaction completed by " + details.payer.name.given_name);

                                    // OPTIONAL: Call your server to save the transaction
                                    console.log(details)
                                }}
                            /> */}
                            {/* <PaypalExpressBtn client={{ sandbox: 'AThdpf2emcPZ1oqK01u4sYDShPqaTxBxl3PFqRruAuFJu0k0NX6r9Bb-4f0zy78-Dn7RsZRNVF9AUBWu' }} currency={'USD'} total={1.00} /> */}
                            {/* <div onClick={() => setA(true)}>a</div> */}
                            {/* {a ? */}
                            <PaypalExpressBtn env={env} client={client} currency={'GBP'} total={100.00} />
                            {/* : null} */}
                        </div>
                    </aside>

                </div>
            </div>

        </Layout>
    )
}

export default Checkout;