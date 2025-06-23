import {Component} from 'react'

class MenuCategories extends Component {
  render() {
    const {categories, activeCategory, onCategoryClick} = this.props

    return (
      <nav className="menu-categories-nav">
        <ul className="menu-categories-list">
          {categories.map(category => (
            <li key={category.menu_category_id}>
              <button
                type="button"
                className={`category-button ${
                  activeCategory === category.menu_category ? 'active' : ''
                }`}
                onClick={() => onCategoryClick(category.menu_category)}
              >
                {category.menu_category}
              </button>
            </li>
          ))}
        </ul>
      </nav>
    )
  }
}

export default MenuCategories
