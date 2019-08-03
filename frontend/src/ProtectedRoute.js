import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { isAuthenticated } from './services/auth'

const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={ props => 
      isAuthenticated() ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: "/", state: { from: props.location } }} />
      )
    }
  />
)

export default ProtectedRoute