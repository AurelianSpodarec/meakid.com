import ReviewBlock from "./sub-components/ReviewBlock";

import { useDispatch, useSelector } from 'react-redux';

import {
    nextStep,
    prevStep,
    selectBillingInfo,
    updateBilling,
    updateShipping,
    selectOrderInfo
} from '../../../lib/slices/checkoutSlice'
import CheckoutFooter from "./sub-components/CheckoutFooter";

function CheckoutStepPayment() {
    const dispatch = useDispatch()
    const orderInfo = useSelector(selectOrderInfo)

    function save() {

    }

    function onNext() {
        console.log("next")
        save()
        dispatch(nextStep())
    }

    function onPrev() {
        save()
        dispatch(prevStep())
    }

    return (
        <div>
            <div className="border px-4">
                <ReviewBlock label="Contact" borderBottom>{orderInfo.billing.email}</ReviewBlock>
                <ReviewBlock label="Ship to">{`${orderInfo.shipping.address_1},${orderInfo.shipping.address_2},${orderInfo.shipping.postcode},${orderInfo.shipping.country}`}</ReviewBlock>
                <ReviewBlock label="Method">{`${"Post Office"} - ${"£2.00"}`}</ReviewBlock>
            </div>

            <div>
                <p>Credit card</p>
                <input placeholder="Card number" />
                <input placeholder="Name on card" />
                <input placeholder="Expiration date (MM/YY)" />
                <input placeholder="Security Code" />
            </div>

            <CheckoutFooter onPrev={onPrev} onNext={onNext} />

        </div>
    )
}

export default CheckoutStepPayment;