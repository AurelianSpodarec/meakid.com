import reac, { useState } from 'react';
import { Layout } from '../../components'

function Checkout() {

    const [currentStep, setCurrentStep] = useState(1);

    return (
        <Layout>
            <section>
                Checkout
            </section>
        </Layout>
    )
}

export default Checkout;