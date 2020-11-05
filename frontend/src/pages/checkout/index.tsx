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
import WooCommerce from '../../services/meakid-wordpress/config_meakid_woocommerce';



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

    let env = 'sandbox';
    let currency = 'GBP';
    const totalPriceToPay = totalPrice + 2


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

    const onSuccess = (payment) => {
        // Congratulation, it came here means everything's fine!
        console.log("The payment was succeeded!", payment);

        const paymentInfo = payment;
        const userAddress = payment.address;

        let data = {
            payment_method: "paypal",
            payment_method_title: "Paypal Transfer",
            set_paid: true,
            billing: {
                first_name: paymentInfo.payerID,
                last_name: paymentInfo.paymentID,
                address_1: "",
                address_2: "",
                city: "",
                state: "",
                postcode: "",
                country: "",
                email: paymentInfo.email,
                phone: ""
            },
            shipping: {
                first_name: userAddress.recipent_name,
                last_name: userAddress.recipent_name,
                address_1: userAddress.line1,
                address_2: "",
                city: userAddress.state,
                state: userAddress.state,
                postcode: userAddress.postal_code,
                country: userAddress.country_code
            },
            line_items: [
                {
                    product_id: 368,
                    variation_id: 369,
                    quantity: 1
                }
            ],
            shipping_lines: [
                {
                    method_id: "pay_pal",
                    method_title: "Paypal",
                    total: "2.00"
                }
            ]
        }

        WooCommerce.post("orders", data)
            .then((response) => {
                console.log("buy res order", response.data);
            })
            .catch((error) => {
                console.log(error.response.data);
            });
        // You can bind the "payment" object's value to your state or props or whatever here, please see below for sample returned data
    }

    const onCancel = (data) => {
        // User pressed "cancel" or close Paypal's popup!
        console.log('The payment was cancelled!', data);
        // You can bind the "data" object's value to your state or props or whatever here, please see below for sample returned data
    }

    const onError = (err) => {
        // The main Paypal's script cannot be loaded or somethings block the loading of that script!
        console.log("Error!", err);
        // Because the Paypal's main script is loaded asynchronously from "https://www.paypalobjects.com/api/checkout.js"
        // => sometimes it may take about 0.5 second for everything to get set, or for the button to appear
    }


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
                                    <p>£{totalPriceToPay.toFixed(2)} GBP</p>
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


                            {typeof window !== 'undefined' &&
                                <PaypalExpressBtn env={env} client={client} currency={currency} onError={onError} onSuccess={onSuccess} onCancel={onCancel} total={totalPriceToPay} />
                            }

                        </div>
                    </aside>

                </div>
            </div>

        </Layout>
    )
}

export default Checkout;