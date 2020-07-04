
import { withRouter } from 'next/router'
import { connect } from 'react-redux';
import { compose } from 'redux';

import { removeFromCart, openCart, closeCart } from '../../store/cart/cart.actions';
import Link from 'next/link';



const Checkout: NextPage = ({ cart, openCart, closeCart }) => {


    return (
        <div>

            <div className="flex justify-between mb-5">
                <h3>Checkout page</h3>

            </div>


            {
                cart.items && cart.items.length !== 0 ?
                    cart.items.map((item, x) => {
                        return (
                            <div>
                                {item.id}
                            </div>
                            // <CartItem
                            //     key={item.id}
                            //     product={item}
                            // // onIncreaseQuantity={onIncreaseQuantity}
                            // // onDecreaseQuantity={onDecreaseQuantity}
                            // />
                            // <button onClick={() => removeFromCart(item.id)}>Remove from cart X</button>
                        )
                    })
                    :
                    "Empty cart"
            }

        </div>
    )
}

const mapDispatchToProps = {
    removeFromCart,
    openCart,
    closeCart
}

const mapStateToProps = state => {
    return {
        cart: state.cart
    }
};

export default compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps)
)(Checkout);