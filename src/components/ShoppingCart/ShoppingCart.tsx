
import { withRouter } from 'next/router'
import { connect } from 'react-redux';
import { compose } from 'redux';

import { removeFromCart, openCart, closeCart } from '../../store/cart/cart.actions';

import CartItem from "./ShoppingCartItem/CartItem";
import Link from 'next/link';


function ShoppingCart({ cart, openCart, closeCart }) {
    console.log("carttt", cart)
    const onIncreaseQuantity = () => {
        console.log("Increae quantity")
    }

    const onDecreaseQuantity = () => {
        console.log("Cart: Decreae quantity")
    }



    return (
        <div className={`${cart.open ? "translate-x-0" : "translate-x-full"} transform transition duration-500 ease-in-out  p-5 min-h-screen fixed overflow-auto z-30 inset-y-0 bottom-0 right-0 bg-white w-full md:w-106`}>

            <div className="flex justify-between mb-5">
                <h3>Your Cart</h3>
                <div onClick={closeCart}>X</div>
            </div>


            {
                cart.items && cart.items.length !== 0 ?
                    cart.items.map((item, x) => {
                        return (

                            <CartItem
                                key={item.id}
                                product={item}
                            // onIncreaseQuantity={onIncreaseQuantity}
                            // onDecreaseQuantity={onDecreaseQuantity}
                            />
                            // <button onClick={() => removeFromCart(item.id)}>Remove from cart X</button>
                        )
                    })
                    :
                    "Empty cart"
            }

            <div className="flex justify-between">
                <p className="text-uppercase">Total</p>
                <p className="font-bold">£15.00</p>
            </div>

            <div className="">
                <button className="mb-2 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">Checkout</button>
                <Link href="/cart">
                    <button className="mb-2 w-full bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-full">
                        Your Cart
                    </button>
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
)(ShoppingCart);