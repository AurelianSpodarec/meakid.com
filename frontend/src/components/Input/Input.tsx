import React, { useState, useRef, useEffect } from 'react'


const Input = ({ label, placeholder, type, value }) => {


    return (

        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            {label &&
                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
                    {label}
                </label>
            }
            <input className=" bg-white rounded-md border px-3 py-2" value={value} type={type} placeholder={placeholder} />
            {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
        </div>

    )

};

export default Input;