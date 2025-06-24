// src/components/CartRoute.js
import React, {Component} from 'react'
import CartContext from '../../context/CartContext'

class CartRoute extends Component {
  renderCartItem = (item, value) => {
    const {
      incrementCartItemQuantity,
      decrementCartItemQuantity,
      removeCartItem,
    } = value

    const handleIncrement = () => {
      incrementCartItemQuantity(item.dish_id)
    }

    const handleDecrement = () => {
      if (item.quantity > 1) {
        decrementCartItemQuantity(item.dish_id)
      } else {
        removeCartItem(item.dish_id)
      }
    }

    const itemTotalPrice = (
      parseFloat(item.dish_price) * item.quantity
    ).toFixed(2)

    return (
      <li key={item.dish_id} className="cart-item">
        {/* Ensure alt text is present and unique if there are multiple images */}
        <img
          src={item.dish_image}
          alt={`${item.dish_name} dish`}
          className="cart-item-image"
        />
        <div className="cart-item-details">
          <h4 className="cart-item-name">{item.dish_name}</h4>
          <p className="cart-item-price">{`${item.dish_currency} ${parseFloat(
            item.dish_price,
          ).toFixed(2)}`}</p>{' '}
          {/* Display unit price */}
          <div className="cart-item-quantity-controls">
            <button
              type="button"
              onClick={handleDecrement}
              className="quantity-button"
            >
              -
            </button>
            <span className="cart-item-quantity">{item.quantity}</span>
            <button
              type="button"
              onClick={handleIncrement}
              className="quantity-button"
            >
              +
            </button>
          </div>
          <p className="cart-item-total-price">{`${item.dish_currency} ${itemTotalPrice}`}</p>
        </div>
      </li>
    )
  }

  renderEmptyCart = () => (
    <div className="empty-cart-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
        alt="empty cart" // Explicit alt text for the empty cart image
        className="empty-cart-image"
      />
      <p className="empty-cart-text">Your cart is empty!</p>
    </div>
  )

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {cartList, removeAllCartItems} = value
          const showEmptyView = cartList.length === 0

          const totalOrderPrice = cartList
            .reduce((acc, item) => {
              return acc + parseFloat(item.dish_price) * item.quantity
            }, 0)
            .toFixed(2)

          return (
            <div className="cart-route-container">
              {showEmptyView ? (
                this.renderEmptyCart()
              ) : (
                <div className="cart-content-container">
                  <h1 className="cart-heading">My Cart</h1>
                  <button
                    type="button"
                    className="remove-all-button"
                    onClick={removeAllCartItems}
                  >
                    Remove All
                  </button>
                  <ul className="cart-items-list">
                    {cartList.map(item => this.renderCartItem(item, value))}
                  </ul>
                  <div className="order-summary">
                    {/* Ensure direct text content for the total price */}
                    <h3>{`Order Total: INR ${totalOrderPrice}`}</h3>
                    <button type="button" className="place-order-button">
                      Place Order
                    </button>
                  </div>
                </div>
              )}
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartRoute
