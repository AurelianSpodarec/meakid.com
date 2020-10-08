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

function CheckoutStepShipping() {

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
            <div>
                <div className="border px-4">
                    <ReviewBlock label="Contact" borderBottom>{orderInfo.billing.email}</ReviewBlock>
                    <ReviewBlock label="Ship to">{`${orderInfo.shipping.address_1},${orderInfo.shipping.address_2},${orderInfo.shipping.postcode},${orderInfo.shipping.country}`}</ReviewBlock>
                </div>
            </div>

            <div>
                <h3>Shipping method</h3>
                <button className="flex items-center justify-between w-full bg-white rounded-md border-2 border-blue-500 p-4 focus:outline-none">
                    <label className="flex items-center">
                        <input type="radio" className="form-radio h-5 w-5 text-blue-600" checked="true" />
                        <span className="ml-2 text-sm text-gray-700">Post office</span>
                    </label>
                    <span className="text-gray-600 text-sm">£2.20</span>
                </button>

            </div>


            <CheckoutFooter onPrev={onPrev} onNext={onNext} />
        </div>
    )
}

export default CheckoutStepShipping;