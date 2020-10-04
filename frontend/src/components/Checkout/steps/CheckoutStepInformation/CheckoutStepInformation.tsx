import useForm from '../../../../hooks/useForm';
import Input from '../../../Input/Input';
import { useDispatch, useSelector } from 'react-redux'

import {
    selectBillingInfo,
    updateBilling,
    updateShipping,
} from './../../../../lib/slices/checkoutSlice'
import { useState } from 'react';

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

function CheckoutStepInformation() {

    const dispatch = useDispatch()
    const { handleChange, handleSubmit, values } = useForm(save, INITIAL_STATE)

    function save() {
        const shippingValues = values;
        delete shippingValues.email
        delete shippingValues.phone

        dispatch(updateShipping(shippingValues))
        dispatch(updateBilling(values));
    }

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


            <div className="flex justify-between mt-6 mb-10">
                <button className="flex items-center text-gray-700 text-sm font-medium rounded hover:underline focus:outline-none">
                    <svg className="h-5 w-5" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M7 16l-4-4m0 0l4-4m-4 4h18"></path></svg>
                    <span className="mx-2">Back step</span>
                </button>

                <button onClick={() => save()} className="flex items-center rounded-full px-6 py-3 uppercase font-bold bg-black text-white text-sm font-medium rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                    <span>Continue to Shipping</span>
                    <svg className="h-5 w-5 mx-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </button>
            </div>

            <div className="text-center text-xs">
                <p>By placing your order you agree to Meakid's <a>Terms and Conditions</a>, <a>Privacy Notice</a> and <a>Cookie Policy</a>.</p>
            </div>

        </section>
    )
}

export default CheckoutStepInformation;