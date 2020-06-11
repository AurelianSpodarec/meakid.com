import CartItem from "./CartItem/CartItem";

import { withRouter } from 'next/router'
import { connect } from 'react-redux';
import { compose } from 'redux';
import { removeFromCart } from '../../store/cart/cart.actions';

function Cart({ cart }) {
    return (
        <div className="min-h-screen">

            <div>
                <h3>Shopping Cart</h3>
                <div>X</div>
            </div>

            {
                cart.items && cart.items.length !== 0 ?
                    cart.items.map((item, x) => {
                        return (
                            <div>
                                <div>Item ID:{item.id}</div>
                                <div>Item ID:{item.name}</div>
                                <div>Quantity: {item.quantity}</div>

                                <button onClick={() => removeFromCart(item.id)}>Remove from cart X</button>
                            </div>
                        )
                    })
                    :
                    "Empty cart"
            }

            <div>
                <p>Total</p>
                <p>£15.00</p>
            </div>

            <div>
                <button>Checkout</button>
                <button>Your Cart</button>
            </div>

        </div>
    )
}


const mapDispatchToProps = {
    removeFromCart
}

const mapStateToProps = state => {
    return {
        cart: state.cart
    }
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Cart);