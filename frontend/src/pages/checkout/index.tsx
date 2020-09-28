import reac, { useState } from 'react';
import { Layout } from '../../components'

function Checkout() {

    const [currentStep, setCurrentStep] = useState(1);

    return (
        <Layout>
            <div className="container mx-auto px-4" style={{ maxWidth: '1150px' }}>
                <div className="grid grid-cols-12 gap-4">

                    <section className="col-span-7">
                        <div>
                            Steps
                        </div>

                        <div>
                            Info
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