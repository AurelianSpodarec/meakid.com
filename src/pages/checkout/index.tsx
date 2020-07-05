import react, { useState } from 'react';

import { withRouter } from 'next/router'
import { connect } from 'react-redux';
import { compose } from 'redux';

import { removeFromCart, openCart, closeCart } from '../../store/cart/cart.actions';
import Link from 'next/link';


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