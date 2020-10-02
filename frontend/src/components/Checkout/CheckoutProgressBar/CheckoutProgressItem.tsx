import { Layout, Hero } from '../..';

function CheckoutProgressItem({ currentStep, step, label, completed, route }) {

    // prev steps have a check, next steps have a number

    let isCurrentStep = currentStep === step
    let isPrevStep = currentStep <= step;

    return (
        <>
            <div className="w-1/5" key={label}>
                <div className="relative mb-2">

                    <div className={`${isCurrentStep ? "border-gray-800" : 'border-gray-400'} w-12 h-12 mx-auto bg-white border-4  rounded-full text-lg text-white flex items-center`}>
                        <span className="text-center font-bold text-gray-600 w-full">
                            {isPrevStep ? step :

                                <svg style={{ fontSize: "20px", width: "20px", margin: "0 auto" }} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#cbd5e0" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>}
                        </span>
                    </div>

                </div>

                <div style={{ fontSize: "11px" }} className={`${isCurrentStep ? "text-black" : "text-gray-400"} font-bold text-center md:text-base uppercase text-xs`}>{label}</div>

            </div>

        </>
    )
}

export default CheckoutProgressItem;

