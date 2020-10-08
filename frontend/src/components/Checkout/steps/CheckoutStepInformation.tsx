import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'

import useForm from '../../../hooks/useForm';
import Input from '../../Input/Input';

import CheckoutFooter from './sub-components/CheckoutFooter';

import {
    nextStep,
    prevStep,
    selectBillingInfo,
    updateBilling,
    updateShipping
} from '../../../lib/slices/checkoutSlice'

const INITIAL_STATE = {
    first_name: "",
    last_name: "",
    address_1: "",
    address_2: "",
    city: "",
    state: "",
    postcode: "",
    country: "",
    email: "",
    phone: "",
}

function CheckoutStepInformation({ currentStep, checkoutSteps }) {

    const dispatch = useDispatch()
    const billingInfo = useSelector(selectBillingInfo)

    const { handleChange, handleSubmit, values } = useForm(save, billingInfo)

    function save() {
        const shippingValues = values;
        // if (shippingValues.email) {
        //     delete shippingValues.email
        //     delete shippingValues.phone
        // }

        dispatch(updateShipping(shippingValues))
        dispatch(updateBilling(values));
    }


    console.log(billingInfo)
    function onNext() {
        console.log("next")
        save()
        dispatch(nextStep())
    }

    function onPrev() {
        save()
        dispatch(prevStep())
    }

    useEffect(() => {
        // repopulate values from redux

        // get info and repopulate it each time it loads into values
    }, [])

    return (
        <section>

            <div>
                <h3>Contact Information</h3>
                <div>
                    <Input placeholder="Email" name="email" value={values.email} onChange={handleChange} />
                </div>
            </div>

            <div>
                <h3>Shipping address</h3>
                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                        <Input placeholder="First name" name="first_name" value={values.first_name} onChange={handleChange} />
                    </div>
                    <div className="col-span-6">
                        <Input placeholder="Last name" name="last_name" value={values.last_name} onChange={handleChange} />
                    </div>
                </div>

                <Input placeholder="Address Line 1" name="address_1" value={values.address_1} onChange={handleChange} />
                <Input placeholder="Address Line 2" name="address_2" value={values.address_2} onChange={handleChange} />
                <Input placeholder="City" name="city" value={values.city} onChange={handleChange} />


                <div className="grid grid-cols-12 gap-4">
                    <div className="col-span-6">
                        <div className="relative my-2">
                            <select name="country" value={values.country} onChange={handleChange} className="block appearance-none w-full bg-white border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                <option>United Kingdom</option>
                                <option>Jersey</option>
                                <option>Isle of Man</option>
                                <option>Guernsey</option>
                            </select>
                            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-700">
                                <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-6">
                        <Input placeholder="Postcode" name="postcode" value={values.postcode} onChange={handleChange} />
                    </div>
                </div>

                <Input placeholder="Phone" name="phone" value={values.phone} onChange={handleChange} />
            </div>

            <CheckoutFooter currentStep={currentStep} onPrev={onPrev} onNext={onNext} />

        </section>
    )
}

export default CheckoutStepInformation;