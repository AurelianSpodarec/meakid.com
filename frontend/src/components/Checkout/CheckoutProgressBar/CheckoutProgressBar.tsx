import { Layout, Hero } from '../..';
import CheckoutProgressItem from './CheckoutProgressItem';


function CheckoutProgressBar({ checkoutSteps, currentStep }) {


    return (
        <div className="relative mb-12">
            <div className="flex justify-between w-full relative z-10">
                {
                    checkoutSteps.map(item =>
                        <CheckoutProgressItem
                            currentStep={currentStep}
                            step={item.step}
                            label={item.name}
                            completed={item.completed}
                            route={item.route}
                        />
                    )
                }
            </div>
            <div style={{
                "width": "80%",
                "left": "10%",
                "right": "0",
                "position": "absolute",
                "top": "calc(50% - 16px)"
            }} className="w-full bg-gray-200 rounded items-center align-middle  align-center flex-1">
                <div className="w-0 bg-gray-400 py-1 rounded w-full"></div>
            </div>

        </div >
    )
}

export default CheckoutProgressBar;