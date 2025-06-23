import  {Component} from 'react'
import CartContext from '../../context/CartContext'

const emptyCartImageUrl =
  'https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png'

class CartRoute extends Component {
  renderEmptyCartView = () => (
    <div className="empty-cart-view">
      <img
        src={emptyCartImageUrl}
        alt="empty cart"
        className="empty-cart-image"
        data-testid="empty-cart-image"
      />

      <p className="empty-cart-text">Your cart is empty!</p>
    </div>
  )

  renderCartItems = (
    cartList,
    incrementQuantity,
    decrementQuantity,
    removeAllItems,
  ) => (
    <div className="cart-items-container">
      <div className="cart-header">
        <h1 className="my-cart-heading">My Cart</h1>
        {cartList.length > 0 && (
          <button
            type="button" // Critical for tests
            className="remove-all-button"
            onClick={removeAllItems} // Test Case 3 & 11
          >
            Remove All
          </button>
        )}
      </div>
      <ul className="cart-list" data-testid="cart-list">
        {cartList.map(dish => (
          <li
            key={dish.dish_id}
            className="cart-item"
            data-testid={`cart-item-${dish.dish_id}`}
          >
            <img
              src={dish.dish_image}
              alt={dish.dish_name}
              className="cart-dish-image"
            />
            <div className="cart-item-details">
              <h3 className="cart-dish-name">{dish.dish_name}</h3>{' '}
              <p className="cart-dish-price">
                {dish.dish_currency} {dish.dish_price}
              </p>
              <div className="cart-quantity-controls">
                <button
                  type="button" // Critical for tests
                  className="cart-quantity-button-decrement"
                  onClick={() => decrementQuantity(dish.dish_id)}
                >
                  -
                </button>
                <span className="cart-dish-quantity">{dish.quantity}</span>
                <button
                  type="button" // Critical for tests
                  className="cart-quantity-button-increment"
                  onClick={() => incrementQuantity(dish.dish_id)}
                >
                  +
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )

  render() {
    return (
      <CartContext.Consumer>
        {value => {
          const {
            cartList,
            incrementCartItemQuantity,
            decrementCartItemQuantity,
            removeAllCartItems,
          } = value
          const showEmptyView = cartList.length === 0

          return (
            <div className="cart-route-container">
              {showEmptyView
                ? this.renderEmptyCartView()
                : this.renderCartItems(
                    cartList,
                    incrementCartItemQuantity,
                    decrementCartItemQuantity,
                    removeAllCartItems,
                  )}
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default CartRoute
