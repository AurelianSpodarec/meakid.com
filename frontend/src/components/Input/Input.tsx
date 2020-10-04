import React, { useState, useRef, useEffect } from 'react'


const Input = ({ label, onChange, name, placeholder, type, value }) => {

    // if its not selected, padding to be same for py
    const isEmpty = value;
    // console.log("isEmpty", value)

    const [typed, setTyped] = useState(false)
    const [focus, setfocus] = useState(false)

    // function onChangee() {
    //     onChange()
    //     setTyped(true)
    // }

    // If empty and not focused, set typed to false

    useEffect(() => {
        if (value === "") {
            setTyped(false)
        } else {
            setTyped(true)
        }
    }, [value])

    return (

        <div className="w-full relative py-2">
            {placeholder &&
                <label style={{ fontSize: "10px" }} className={`${typed ? "top-0 opacity-1 visible" : "opacity-0 top-5 invisible"} transition-all duration-200 ease-out absolute top-0 block px-3 pt-4 tracking-wide text-gray-700 text-xs font-bold mb-2`}>{placeholder}</label>
            }
            <input onChange={onChange} name={name} className={` ${typed ? "pt-5 pb-1" : " py-3"} px-3  text-sm bg-white w-full rounded-md border transition-all duration-200 ease-out`} value={value} type={type} placeholder={placeholder} />
            {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
        </div>

    )

};

export default Input;