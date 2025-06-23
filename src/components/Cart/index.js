import React from 'react'
import {CartContext} from '../../context/CartContext'

class Cart extends React.Component {
  render() {
    const {
      cartList,
      removeCartItem,
      incrementCartItemQuantity,
      decrementCartItemQuantity,
      removeAllCartItems,
    } = this.context

    const total = cartList.reduce(
      (sum, item) => sum + item.cost * item.quantity,
      0,
    )

    return (
      <div>
        <h1>Cart</h1>
        {cartList.length === 0 ? (
          <div>
            <p>No Items in Cart</p>
          </div>
        ) : (
          <div data-testid="cart">
            <ul>
              {cartList.map(item => (
                <li key={item.id}>
                  <p>{item.name}</p>
                  <button onClick={() => decrementCartItemQuantity(item.id)}>
                    -
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => incrementCartItemQuantity(item.id)}>
                    +
                  </button>
                  <button onClick={() => removeCartItem(item.id)}>
                    Remove
                  </button>
                </li>
              ))}
            </ul>
            <p>Total: ₹{total}</p>
            <button type="button" onClick={removeAllCartItems}>
              Remove All
            </button>
          </div>
        )}
      </div>
    )
  }
}

Cart.contextType = CartContext
export default Cart
