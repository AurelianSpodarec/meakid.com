import reac, { useState } from 'react';
import { Layout, CartList } from '../components'

function Cart() {

    const [currentStep, setCurrentStep] = useState(1);

    return (
        <Layout>
            <div className="container mx-auto px-4">
                <h1>Shopping Cart</h1>

                <CartList />
            </div>
        </Layout>
    )
}

export default Cart;