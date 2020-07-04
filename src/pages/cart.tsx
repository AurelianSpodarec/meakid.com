
import { withRouter } from 'next/router'
import { connect } from 'react-redux';
import { compose } from 'redux';

import { removeFromCart, openCart, closeCart } from '../store/cart/cart.actions';
import Link from 'next/link';



const Cart: NextPage = ({ cart, openCart, closeCart }) => {


    return (
        <div>

            <div className="flex justify-between mb-5">
                <h3>Shopping Cart</h3>

            </div>

            <div className="container mx-auto">
                {
                    cart.items && cart.items.length !== 0 ?
                        cart.items.map((item, x) => {
                            return (
                                <div key={item.id} className="border-b-2 border-gray-300 pb-6 mb-6">
                                    <div className="flex flex-row">
                                        <img
                                            className="object-cover"
                                            style={{ height: '120px' }}
                                            src={item.image.src}
                                            title="Contemplative Reptile"
                                            alt="Sunset in the mountains"
                                        />
                                        <div className="flex flex-row justify-between">
                                            <h3>item name</h3>
                                            <p>£{parseFloat(item.price).toFixed(2)}</p>
                                        </div>
                                    </div>
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


                <Link href="/checkout">
                    <button className="mb-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Checkout</button>
                </Link>
            </div>


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
)(Cart);