// src/components/DishCard.js
import React, {Component} from 'react'

class DishCard extends Component {
  state = {
    stagedQuantity: 0,
  }

  componentDidMount() {
    if (this.props.quantity > 0) {
      this.setState({stagedQuantity: this.props.quantity})
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.quantity !== this.props.quantity) {
      this.setState({stagedQuantity: this.props.quantity})
    }
  }

  handleIncrementStagedQuantity = () => {
    this.setState(prevState => ({
      stagedQuantity: prevState.stagedQuantity + 1,
    }))
  }

  handleDecrementStagedQuantity = () => {
    this.setState(prevState => {
      if (prevState.stagedQuantity > 0) {
        return {stagedQuantity: prevState.stagedQuantity - 1}
      }
      return null
    })
  }

  handleAddToCartClick = () => {
    const {dish, onAddOrUpdateCart} = this.props
    const {stagedQuantity} = this.state

    if (stagedQuantity > 0) {
      onAddOrUpdateCart(dish, stagedQuantity)
    }
  }

  render() {
    const {dish} = this.props
    const {stagedQuantity} = this.state

    const showQuantityControls = dish.dish_Availability
    const showAddToCartButton = dish.dish_Availability && stagedQuantity > 0

    
    const displayedPrice =
      stagedQuantity > 0
        ? (parseFloat(dish.dish_price) * stagedQuantity).toFixed(2)
        : parseFloat(dish.dish_price).toFixed(2) 
    return (
      <div className="dish-card">
        <div
          className="dish-indicator"
          style={{backgroundColor: dish.dish_Type === 20 ? 'green' : 'red'}}
          role="presentation"
          aria-label={
            dish.dish_Type === 20
              ? 'Vegetarian indicator'
              : 'Non-vegetarian indicator'
          }
        ></div>
        <div className="dish-details">
         
          <h3 className="dish-name">{dish.dish_name}</h3>
         
          <p className="dish-price">{`${dish.dish_currency} ${displayedPrice}`}</p>
          <p className="dish-description">{dish.dish_description}</p>
         
          <p className="dish-calories">{`${dish.dish_calories} calories`}</p>

          {dish.addonCat && dish.addonCat.length > 0 && (
            <p className="customizations-available">Customizations available</p>
          )}

          {!dish.dish_Availability && (
            <p className="not-available">Not available</p>
          )}

          {showQuantityControls && (
            <div className="quantity-controls">
              <button
                type="button"
                className="quantity-button decrement"
                onClick={this.handleDecrementStagedQuantity}
                disabled={stagedQuantity === 0}
              >
                -
              </button>
             
              <p className="dish-quantity">{stagedQuantity}</p>
              <button
                type="button"
                className="quantity-button increment"
                onClick={this.handleIncrementStagedQuantity}
              >
                +
              </button>
            </div>
          )}

          {showAddToCartButton && (
            <button
              type="button"
              className="add-to-cart-button"
              onClick={this.handleAddToCartClick}
            >
              ADD TO CART
            </button>
          )}
        </div>
        <img
          src={dish.dish_image}
          alt={dish.dish_name}
          className="dish-image"
        />
      </div>
    )
  }
}

export default DishCard
