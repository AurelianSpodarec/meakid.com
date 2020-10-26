



function Select() {
    return (
        <button className="flex items-center justify-between w-full bg-white rounded-md border-2 border-blue-500 p-4 focus:outline-none">
            <label className="flex items-center">
                <input type="radio" className="form-radio h-5 w-5 text-blue-600" checked={true} />
                <span className="ml-2 text-sm text-gray-700">Post office</span>
            </label>
            <span className="text-gray-600 text-sm">£2.20</span>
        </button>
    )
}

export default Select;