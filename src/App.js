// src/App.js
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

import Header from './components/Header';
import MenuCategories from './components/MenuCategories';
import DishCard from './components/DishCard';
import LoadingSpinner from './components/LoadingSpinner';
import Login from './components/Login';
import CartRoute from './components/CartRoute';
import CartContext, { CartProvider } from './context/CartContext';

import './App.css';

const dishesApiUrl =
  'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details';

const ProtectedRoute = props => {
  const jwtToken = Cookies.get('jwt_token');
  if (jwtToken === undefined) {
    return <Redirect to="/login" />;
  }
  return <Route {...props} />;
};

class HomeContent extends Component {
  state = {
    restaurantName: '',
    menuCategories: [],
    activeCategory: '',
    dishes: [],
    loading: true,
    error: null,
  };

  componentDidMount() {
    this.fetchRestaurantData();
  }

  fetchRestaurantData = async () => {
    this.setState({ loading: true, error: null });
    try {
      const response = await fetch(dishesApiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const restaurantDetails = data[0];

      this.setState(
        {
         
          restaurantName: restaurantDetails.restaurant_name,
          menuCategories: restaurantDetails.table_menu_list,
          loading: false,
        },
        () => {
          if (this.state.menuCategories.length > 0) {
            this.handleCategoryClick(this.state.menuCategories[0].menu_category);
          }
        }
      );
    } catch (error) {
      console.error('Failed to fetch restaurant data:', error);
      this.setState({
        error: 'Failed to load restaurant data. Please try again.',
        loading: false,
      });
    }
  };

  handleCategoryClick = categoryName => {
    this.setState({ activeCategory: categoryName }, () => {
      this.renderCategoryDishes();
    });
  };

  renderCategoryDishes = () => {
    const { menuCategories, activeCategory } = this.state;
    const currentCategoryData = menuCategories.find(
      category => category.menu_category === activeCategory
    );

    this.setState({
      dishes: currentCategoryData ? currentCategoryData.category_dishes : [],
    });
  };

  render() {
    const {
      restaurantName,
      menuCategories,
      activeCategory,
      dishes,
      loading,
      error,
    } = this.state;

    if (loading) {
      return <LoadingSpinner />;
    }

    if (error) {
      return <div className="error-message">{error}</div>;
    }

    return (
      <CartContext.Consumer>
        {value => {
          const { cartList, addCartItem } = value;
          const getDishQuantity = (dishId) => {
            const item = cartList.find(item => item.dish_id === dishId);
            return item ? item.quantity : 0;
          }

          const handleAddOrUpdateCart = (dish, stagedQuantity) => {
            addCartItem(dish, stagedQuantity);
          }

          return (
            <>
             
              <MenuCategories
                categories={menuCategories}
                activeCategory={activeCategory}
                onCategoryClick={this.handleCategoryClick}
              />
              <div className="dishes-list">
                {dishes.length > 0 ? (
                  dishes.map(dish => (
                    <DishCard
                      key={dish.dish_id}
                      dish={dish}
                      quantity={getDishQuantity(dish.dish_id)}
                      onAddOrUpdateCart={handleAddOrUpdateCart}
                    />
                  ))
                ) : (
                  <p className="no-dishes-message">
                    No dishes available for this category.
                  </p>
                )}
              </div>
            </>
          );
        }}
      </CartContext.Consumer>
    );
  }
}

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <CartProvider>
          
          <Route path="/" render={({ location }) => (
            location.pathname !== '/login' && (
              <CartContext.Consumer>
                {value => {
                  const { cartList } = value;
                  const cartCount = cartList.reduce((acc, item) => acc + item.quantity, 0);
                 
                  return <Header restaurantName="UNI Resto Cafe" cartCount={cartCount} />;
                }}
              </CartContext.Consumer>
            )
          )} />

          <div className="app-container">
            <Switch>
              <Route exact path="/login" component={Login} />
              <ProtectedRoute exact path="/" component={HomeContent} />
              <ProtectedRoute exact path="/cart" component={CartRoute} />
              <Redirect to="/login" />
            </Switch>
          </div>
        </CartProvider>
      </BrowserRouter>
    );
  }
}

export default App;
