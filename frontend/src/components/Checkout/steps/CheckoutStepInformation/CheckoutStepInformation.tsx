import Input from '../../../Input/Input';

function CheckoutStepInformation() {
    return (
        <section>

            <div>
                <h3>Contact Information</h3>
                <div>
                    <Input placeholder="Email" />
                </div>
            </div>

            <div>
                <h3>Shipping address</h3>
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                        <Input placeholder="First name" />
                    </div>
                    <div className="col-span-6">
                        <Input placeholder="Last name" />
                    </div>
                </div>
                <Input placeholder="Company(optional)" />
                <Input placeholder="Address Line 1" />
                <Input placeholder="Address Line 2" />
                <Input placeholder="City" />

                <Input placeholder="Postcode" />

                <Input placeholder="Phone" />
            </div>

            <div>
                <button>Return to cart</button>

                <button>Continue to Shipping</button>
            </div>

            <div>
                <p>By placing your order you agree to Meakid's <a>Terms and Conditions</a>, <a>Privacy Notice</a> and <a>Cookie Policy</a>.</p>
            </div>

        </section>
    )
}

export default CheckoutStepInformation;