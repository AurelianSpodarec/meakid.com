import reac, { useState } from 'react';
import { Layout, CartList } from '../components'

function Cart() {

    const [currentStep, setCurrentStep] = useState(1);

    return (
        <Layout>
            <div className="container mx-auto px-4">


                <div className="text-center my-5 w-full">
                    <h3 className="uppercase font-bold text-3xl">Shopping Cart</h3>
                </div>


                <CartList />
            </div>
        </Layout>
    )
}

export default Cart;