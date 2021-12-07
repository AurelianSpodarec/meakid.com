import reac, { useState } from 'react';
import { Layout, CartList } from '../components'

function Contact() {

    const [currentStep, setCurrentStep] = useState(1);

    return (
        <Layout>
            <div className="container mx-auto px-4">

Privacy Policy
                
PRODUCTS
All fabrics are cut by hand and although we strive to cut as accurately as possible, there may be discrepancies of 1-3 cm in one metre. 
Fabrics are subject to availability so if the fabric you bought is out of stock we will either refund or give an option to swap for a different one.
The actual colours of fabric may differ from the photo due to the photography limitations and varying screen settings.
We cannot accept any responsibility for any fault, flaws or customer's expectations.
                
ORDERS
Please make sure you provide correct details
If you wish to cancel or amend your order please send us an email to desidree.shop@yahoo.it
We cannot amend or cancel orders that have been packed and dispatched.
If you'd like to add to your order please send us an email and we can send you an invoice to pay.
If your order is combined we will refund extra postage.
Please note that the shipping label and tracking may be generated in advance
                
TURNAROUND
The turnaround (time to prepare your order for shipping) may be varier usually it's 1-3 working days
During the busy times it can be up to 5 working days.
The turnaround does not include the shipping time.
                
SHIPPING
Mainland UK
We ship parcels to mainland UK by Royal Mail, Hermes or DPD . If you prefer to be sent by another courier we can discuss and the customer will pay the difference. 
                
INTERNATIONAL SHIPPING
We do not ship internationally. 
                                                                        
RETURNS AND REFUNDS
We only accept returns of unused, unwashed and uncut fabrics.
We only accept returns of fabrics within 14 days from the receipt of an order.
The return postage cost is paid by the buyer.
We only refund the cost of the fabric, not the delivery cost.
Products on sale or clearance are not refundable or not returned, even if they have any defects.
Once we receive the return we will issue a refund to the same payment method used to pay for your order within 2 working days.
Your personal information is confidential and will only be used to process your order.

            </div>
        </Layout>
    )
}

export default Contact;
