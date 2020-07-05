import react, { useState, useEffect } from 'react';

import { withRouter } from 'next/router'
import { connect } from 'react-redux';
import { compose } from 'redux';

import { removeFromCart, openCart, closeCart } from '../../store/cart/cart.actions';

import WooCommerce from '../../services/woocommerce/config_woocommerce';


const DeliveryStep = () => {
    return (
        <div>
            <div>
                <h3 className="">Contact Information</h3>
                <input placeholder="Email" />
                <input placeholder="Phone" />
            </div>

            <div>
                <h3 className="">Shipping Address</h3>
                <div>
                    <input placeholder="First name" />
                    <input placeholder="Last Name" />
                </div>

                <input placeholder="Company(optional)" />

                <input placeholder="Company(optional)" />
                <input placeholder="Company(optional)" />
                <input placeholder="Company(optional)" />

                <input placeholder="Company(optional)" />
                <input placeholder="Company(optional)" />

            </div>
        </div>
    )
}

const ShippingStep = () => {
    return (
        <div>
            Shopping step
        </div>
    )
}

const PaymentStep = () => {
    return (
        <div>
            PaymentStep
        </div>
    )
}

const ConfirmationStep = () => {
    return (
        <div>
            Confirmation
        </div>
    )
}


const Checkout: NextPage = ({ cart, openCart, closeCart }) => {

    const [currentStep, setCurrentStep] = useState(1);

    const [order, setOrder] = useState({
        payment_method: "bacs",
        payment_method_title: "Direct Bank Transfer",
        set_paid: true,
        billing: {
            first_name: "John",
            last_name: "Doe",
            address_1: "969 Market",
            address_2: "",
            city: "San Francisco",
            state: "CA",
            postcode: "94103",
            country: "US",
            email: "john.doe@example.com",
            phone: "(555) 555-5555"
        },
        shipping: {
            first_name: "John",
            last_name: "Doe",
            address_1: "969 Market",
            address_2: "",
            city: "San Francisco",
            state: "CA",
            postcode: "94103",
            country: "US"
        },
        line_items: [
            {
                product_id: 93,
                quantity: 2
            },
            {
                product_id: 22,
                variation_id: 23,
                quantity: 1
            }
        ],
        shipping_lines: [
            {
                method_id: "flat_rate",
                method_title: "Flat Rate",
                total: 10
            }
        ]
    })

    const requestCreateOrder = async () => {

        const a = await WooCommerce.post(`orders`, {
            "payment_method": "bacs",
            "payment_method_title": "Direct Bank Transfer",
            "set_paid": true,
            "billing": {
                "first_name": "John",
                "last_name": "Doe",
                "address_1": "969 Market",
                "address_2": "",
                "city": "San Francisco",
                "state": "CA",
                "postcode": "94103",
                "country": "US",
                "email": "john.doe@example.com",
                "phone": "(555) 555-5555"
            },
            "shipping": {
                "first_name": "John",
                "last_name": "Doe",
                "address_1": "969 Market",
                "address_2": "",
                "city": "San Francisco",
                "state": "CA",
                "postcode": "94103",
                "country": "US"
            },
            "line_items": [

                {
                    "product_id": 73,
                    "variation_id": 88,
                    "quantity": 1
                }
            ],
            "shipping_lines": [
                {
                    "method_id": "flat_rate",
                    "method_title": "Flat Rate",
                    "total": "10"
                }
            ]
        }

        )
            .then((response) => {
                console.log("sd", response);
            })
            .catch((error) => {
                console.log("wewe", error.response);
            });

        // let a = await fetch('http://localhost:8888/wp-json/wc/v3/orders?oauth_consumer_key=ck_14bc1d5dfe2ef575063dc21b96de63563284a187&oauth_nonce=FlhXdnNpqV1W3zeRnd5T3OnUfzXVsRJ2&oauth_signature_method=HMAC-SHA256&oauth_version=1.0', {
        //     method: 'POST',
        //     // credentials: 'include',
        //     headers: {
        //         'Content-Type': 'application/json;charset=UTF-8',
        //         // credentials: 'omit'
        //         // "Access-Control-Allow-Origin": "*",
        //         // consumer_key: 'ck_14bc1d5dfe2ef575063dc21b96de63563284a187',
        //         // consumer_secret: 'cs_75d6c167e18a7eaac8ed7bc3e5bf32ee660c0227',
        //     },
        //     body: JSON.stringify(
        //         {
        //             payment_method: "bacs",
        //             payment_method_title: "Direct Bank Transfer",
        //             set_paid: true,
        //             billing: {
        //                 first_name: "John",
        //                 last_name: "Doe",
        //                 address_1: "969 Market",
        //                 address_2: "",
        //                 city: "San Francisco",
        //                 state: "CA",
        //                 postcode: "94103",
        //                 country: "US",
        //                 email: "john.doe@example.com",
        //                 phone: "(555) 555-5555"
        //             },
        //             shipping: {
        //                 first_name: "John",
        //                 last_name: "Doe",
        //                 address_1: "969 Market",
        //                 address_2: "",
        //                 city: "San Francisco",
        //                 state: "CA",
        //                 postcode: "94103",
        //                 country: "US"
        //             },
        //             line_items: [
        //                 {
        //                     product_id: 22,
        //                     variation_id: 23,
        //                     quantity: 1
        //                 }
        //             ],
        //             shipping_lines: [
        //                 {
        //                     method_id: "flat_rate",
        //                     method_title: "Flat Rate",
        //                     total: "1"
        //                 }
        //             ]
        //         }
        //     )
        // })
        //     // .then(response => response.json())
        //     .then(data => {
        //         console.log('Success:', data);
        //     })
        //     .catch((error) => {
        //         console.error('Error:', error);
        //     });

        // console.log("www", a)

        // WooCommerce.post('orders', order)
        //     .then((response) => {
        //         console.log(response.order);
        //     })
        //     .catch((error) => {
        //         console.log(error.response.order);
        //     },

        //     );
    }

    // url: 'http://localhost:8888',
    // consumerKey: 'ck_14bc1d5dfe2ef575063dc21b96de63563284a187',
    // consumerSecret: 'oauth_consumer_key=ccs_75d6c167e18a7eaac8ed7bc3e5bf32ee660c0227',
    // version: 'wc/v3',
    // credentials: 'include',

    useEffect(() => {
        requestCreateOrder()
    }, [])

    function goToNextStep() {
        setCurrentStep(currentStep => currentStep + 1)
    }

    function goToPreviousStep() {
        setCurrentStep(currentStep => currentStep - 1)
    }

    function renderCurrentStep() {
        switch (currentStep) {
            case 1:
                return (
                    <DeliveryStep />
                );
            case 2:
                return (
                    <ShippingStep />
                );
            case 3:
                return (
                    <PaymentStep />
                );
            case 4:
                return (
                    <ConfirmationStep />
                )
            default: return <DeliveryStep />

        }
    }

    return (
        <div>

            <div className="flex justify-between mb-5">
                <h3>Checkout page</h3>

            </div>


            <div className="container mx-auto px-20">



                <div className="flex flex-row">


                    <div className="flex flex-1 flex-col">

                        <header className="flex flex-row justify-between mb-6 text-center">
                            {/* steps */}

                            <div>
                                <div>1</div>
                                <div>Information</div>
                            </div>

                            <div>
                                <div>2</div>
                                <div>Shipping</div>
                            </div>

                            <div>
                                <div>3</div>
                                <div>Payment</div>
                            </div>

                        </header>


                        <main>

                            {renderCurrentStep()}

                            <button onClick={goToPreviousStep}>Prev Step</button>
                            <button onClick={goToNextStep} className="bg-black text-white rounded-full p-4">Continue to Shipping</button>

                        </main>

                    </div>
                    <sidebar className="w-100">
                        <div>
                            {
                                cart.items && cart.items.length !== 0 ?
                                    cart.items.map((item, x) => {
                                        return (
                                            <div>
                                                {item.id}
                                            </div>
                                            // <CartItem
                                            //     key={item.id}
                                            //     product={item}
                                            // // onIncreaseQuantity={onIncreaseQuantity}
                                            // // onDecreaseQuantity={onDecreaseQuantity}
                                            // />
                                            // <button onClick={() => removeFromCart(item.id)}>Remove from cart X</button>
                                        )
                                    })
                                    :
                                    "Empty cart"
                            }
                        </div>

                        <div>
                            <input placeholder="Discount code" />
                            <button>Apply</button>
                        </div>

                        <div>
                            <div>
                                <p>Subtotal</p>
                                <p>£105.00</p>
                            </div>
                        </div>

                        <div className="flex flex-row justify-between">
                            <div>
                                <span>Total</span>
                                <span>Including £15.50 in taxes</span>
                            </div>
                            <div>
                                <span>£105.00</span>
                            </div>
                        </div>

                    </sidebar>
                </div>
            </div>

        </div>
    )
}

const mapDispatchToProps = {
    removeFromCart,
    openCart,
    closeCart
}

const mapStateToProps = state => {
    return {
        cart: state.cart
    }
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Checkout);