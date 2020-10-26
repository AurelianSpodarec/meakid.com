
function ReviewBlock({ label, children, onClick, borderBottom }: any) {
    return (
        <div className={`flex justify-between text-sm py-3 ${borderBottom ? "border-b" : ""}`}>
            <div className="flex">
                <div className="mr-8 font-bold text-gray-600">{label}</div>
                <div>
                    {children}
                </div>
            </div>
            <div><span className="text-xs font-bold text-gray-700 hover:text-gray-500 cursor-pointer transition-all duration-200 ease-in-out" onClick={onClick}>Change</span></div>
        </div>
    )
}

export default ReviewBlock;