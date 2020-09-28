import { Layout, Hero } from '../..';

function CheckoutProgressItem({ stepName, index }) {

    // prev steps have a check, next steps have a number

    return (
        <div>
            {stepName}
        </div>
    )
}

export default CheckoutProgressItem;