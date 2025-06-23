import React from 'react'
import CartContext from '../../context/CartContext'

class Home extends React.Component {
  state = {menuList: []}

  componentDidMount() {
    this.getMenu()
  }

  getMenu = async () => {
    const response = await fetch(
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
    )
    const data = await response.json()
    this.setState({menuList: data.food_items})
  }

  render() {
    const {cartList, addCartItem} = this.context
    const {menuList} = this.state

    return (
      <div>
        <h1>Restaurant Menu</h1>
        <ul>
          {menuList.map(item => {
            const isAvailable =
              item.availability === 'Available' && item.quantity > 0
            const alreadyInCart = cartList.some(
              cartItem => cartItem.id === item.id,
            )
            return (
              <li key={item.id}>
                <h2>{item.name}</h2>
                {isAvailable && !alreadyInCart && (
                  <button
                    type="button"
                    onClick={() => addCartItem({...item, quantity: 1})}
                  >
                    Add to Cart
                  </button>
                )}
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

Home.contextType = CartContext
export default Home
