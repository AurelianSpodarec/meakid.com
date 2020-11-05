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
import { useRouter } from 'next/router'
import Router from 'next/router'

import {
    prevStep,
    nextStep,
    selectCheckoutStep
} from './../../lib/slices/checkoutSlice'

import { useDispatch, useSelector } from 'react-redux'
import { current } from 'immer';

import {
    clearCartProducts,
    selectProducts,
    selectTotalPrice
} from './../../lib/slices/cartSlice'
import WooCommerce from '../../services/meakid-wordpress/config_meakid_woocommerce';
import { clearCart } from '../../services/meakid-cocart/api/cart';



// Create an order with the items and put in the checkout

interface ProductData {
    product_id: number,
    quantity: number,
    variation_id: number
}

function Checkout() {
    const [paypalLoaded, setPaypalLoaded] = useState(false);
    const dispatch = useDispatch();

    const products = useSelector(selectProducts)
    const totalPrice = useSelector(selectTotalPrice)

    const [productsToBuy, setProductsToBuy] = useState([])

    const currentStep = useSelector(selectCheckoutStep)

    console.log("prorororoo", products)

    useEffect(() => {
        if (products.length !== 0) {
            for (let i = 0; i < products.length; i++) {
                const product = products[i];

                const obj: any = {
                    product_id: product.product_id,
                    quantity: product.quantity
                }

                if (product && product.variation_id && product.variation_id) {
                    obj.variation_id = product.variation_id
                }

                setProductsToBuy(productsToBuy => [...productsToBuy, obj]);
            }
        }
    }, [])

    const [currentStepObject, setCurrentStepObject] = useState()

    // let env = 'sandbox';
    let env = 'production';
    let currency = 'GBP';
    const totalPriceToPay = totalPrice


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

    const onSuccess = async (payment) => {
        // Congratulation, it came here means everything's fine!
        console.log("The payment was succeeded!", payment);

        const paymentInfo = payment;
        const userAddress = payment.address;

        let data = {
            payment_method: "paypal",
            payment_method_title: "PayPal Transfer",
            set_paid: true,
            billing: {
                first_name: userAddress.recipient_name,
                last_name: "",
                address_1: "Payer ID: " + paymentInfo.payerID,
                address_2: "PaymentID: " + paymentInfo.paymentID,
                city: "",
                state: "",
                postcode: "",
                country: "",
                email: paymentInfo.email,
                phone: ""
            },
            shipping: {
                first_name: userAddress.recipient_name,
                last_name: userAddress.recipient_name,
                address_1: userAddress.line1,
                address_2: "",
                city: userAddress.state,
                state: userAddress.state,
                postcode: userAddress.postal_code,
                country: userAddress.country_code
            },
            line_items: productsToBuy,
            shipping_lines: [
                {
                    method_id: "pay_pal",
                    method_title: "PayPal",
                    total: "0.00"
                }
            ]
        }

        WooCommerce.post("orders", data)
            .then((response) => {
                console.log("buy res order", response.data);

                Router.push('/thankyou')
                // go to thank you page 
            })
            .catch((error) => {
                console.log(error.response.data);
            });

        const a = await clearCart()
        dispatch(clearCartProducts())
        console.log("clear cart", a)
    }

    const onCancel = (data) => {
        console.log('The payment was cancelled!', data);
    }

    const onError = (err) => {
        console.log("Error!", err);
    }


    const client = {
        // sandbox: 'AThdpf2emcPZ1oqK01u4sYDShPqaTxBxl3PFqRruAuFJu0k0NX6r9Bb-4f0zy78-Dn7RsZRNVF9AUBWu',
        production: 'AdWCUQrRMynYqpUHYJisJV7M1wJ4R6BmkNS26I9vo0p8XFU25lIcAtS4-f6c1HuDffFmqbr9CBsiWMdJ',
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
                                {/* <div className="flex justify-between">
                                    <p>Shipping</p>
                                    <p className="text-xs">Calculated at next step</p>
                                </div> */}
                            </div>

                            <div className="flex justify-between">
                                <div>
                                    <p className="text-sm font-bold">Total</p>
                                    {/* <p className="text-xs">Including £24.54 in taxes</p> */}
                                    {/* <p className="text-xs">Including £2.00 in shipping</p> */}
                                    <p className="text-xs">FREE Shipping</p>
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