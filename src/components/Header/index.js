//
import React, {Component} from 'react'
import {withRouter} from 'react-router-dom'

class Header extends Component {
  onCartButtonClick = () => {
    const {history} = this.props
    history.push('/cart')
  }

  render() {
    const {restaurantName, cartCount} = this.props
    return (
      <header className="header">
        <h1 className="restaurant-heading">{restaurantName}</h1>
        <div className="cart-section" >
          <button
            type="button"
            className="my-orders-button"
            onClick={this.onCartButtonClick}
          >
            My Orders
          </button>

          <button
            type="button"
            className="cart-icon-button"
            onClick={this.onCartButtonClick}
            aria-label={`View ${cartCount} items in cart`}
          >
            <span className="cart-icon" role="img" aria-label="shopping cart">
              🛒
            </span>
            <span className="cart-count" data-testid="cart-count">
              {cartCount}
            </span>
          </button>
        </div>
      </header>
    )
  }
}

export default withRouter(Header)
