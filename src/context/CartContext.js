// src/context/CartContext.js
import React, {createContext, Component} from 'react'

const CartContext = createContext({
  cartList: [],
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  removeAllCartItems: () => {},
})

export class CartProvider extends Component {
  state = {
    cartList: [],
  }

  findDishInCart = dishId => {
    const {cartList} = this.state
    return cartList.find(item => item.dish_id === dishId)
  }

 
  addCartItem = (dish, quantityToAdd = 1) => {
    this.setState(prevState => {
      const existingDish = this.findDishInCart(dish.dish_id)
      let updatedCartList

      if (existingDish) {
        
        updatedCartList = prevState.cartList.map(item =>
          item.dish_id === dish.dish_id
            ? {...item, quantity: item.quantity + quantityToAdd} 
            : item,
        )
      } else {
       
        updatedCartList = [
          ...prevState.cartList,
          {...dish, quantity: quantityToAdd},
        ]
      }
      return {cartList: updatedCartList}
    })
  }

  removeCartItem = dishId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(item => item.dish_id !== dishId),
    }))
  }

 
  incrementCartItemQuantity = dishId => {
    this.setState(prevState => {
      const existingDish = this.findDishInCart(dishId)
      if (existingDish) {
        return {
          cartList: prevState.cartList.map(item =>
            item.dish_id === dishId
              ? {...item, quantity: item.quantity + 1}
              : item,
          ),
        }
      }
      return prevState
    })
  }

  decrementCartItemQuantity = dishId => {
    this.setState(prevState => {
      const existingDish = this.findDishInCart(dishId)
      if (existingDish) {
        if (existingDish.quantity > 1) {
          return {
            cartList: prevState.cartList.map(item =>
              item.dish_id === dishId
                ? {...item, quantity: item.quantity - 1}
                : item,
            ),
          }
        } else if (existingDish.quantity === 1) {
         
          return {
            cartList: prevState.cartList.filter(
              item => item.dish_id !== dishId,
            ),
          }
        }
      }
      return prevState 
    })
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        {this.props.children}
      </CartContext.Provider>
    )
  }
}

export default CartContext
