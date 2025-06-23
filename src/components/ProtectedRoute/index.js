import Cookies from 'js-cookie'
import {Redirect, Route} from 'react-router-dom'

const ProtectedRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      Cookies.get('jwt_token') !== undefined ? (
        <Component {...props} />
      ) : (
        <Redirect to="/login" />
      )
    }
  />
)

export default ProtectedRoute
