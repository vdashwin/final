import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

const loginApiUrl = 'https://apis.ccbp.in/login'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  submitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state

    if (username === '' && password === '') {
      this.onSubmitFailure('Please enter username and password.')
      return
    }
    if (username === '') {
      this.onSubmitFailure('Please enter username.')
      return
    }
    if (password === '') {
      this.onSubmitFailure('Please enter password.')
      return
    }

    const userDetails = {username, password}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(loginApiUrl, options)
      const data = await response.json()

      if (response.ok) {
        this.onSubmitSuccess(data.jwt_token)
      } else {
        if (response.ok) {
          this.onSubmitSuccess(data.jwt_token)
        } else {
          let errorMessage = data.error_msg || 'An unexpected error occurred.'
          if (username === '' || password === '') {
            errorMessage = 'Please fill in both username and password.'
          } else if (password === '' || username !== '') {
            errorMessage = 'Username or password is invalid'
          } else if (
            data.error_msg === 'User not found' ||
            data.error_msg === 'invalid username'
          ) {
            errorMessage = 'Invalid username.'
          } else if (
            data.error_msg === 'Password incorrect' ||
            data.error_msg === "username and password didn't match"
          ) {
            errorMessage = "Username and password didn't match."
          }
          this.onSubmitFailure(errorMessage)
        }
        this.onSubmitFailure(
          data.error_msg || 'An unexpected error occurred. Please try again.',
        )
      }
    } catch (error) {
      console.error('Login API call failed:', error)
      this.onSubmitFailure('Failed to connect to the server. Please try again.')
    }
  }

  render() {
    const {username, password, showSubmitError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-form-container">
        <form className="form-container" onSubmit={this.submitForm}>
          <h1 className="login-heading">Login</h1>
          <div className="input-container">
            <label className="input-label" htmlFor="username">
              USERNAME
            </label>
            <input
              type="text"
              id="username"
              className="username-input-field"
              value={username}
              onChange={this.onChangeUsername}
              placeholder="Username"
            />
          </div>
          <div className="input-container">
            <label className="input-label" htmlFor="password">
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              className="password-input-field"
              value={password}
              onChange={this.onChangePassword}
              placeholder="Password"
            />
          </div>
          <button type="submit" className="login-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">{errorMsg}</p>}{' '}
        </form>
      </div>
    )
  }
}

export default Login
