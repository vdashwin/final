import React, {Component} from 'react'

class LoadingSpinner extends Component {
  render() {
    return (
      <div className="spinner-container">
        <div className="spinner"></div>
        <p>Loading restaurant menu...</p>
      </div>
    )
  }
}

export default LoadingSpinner
