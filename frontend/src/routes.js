import React, { Fragment } from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ModalContainer } from "react-router-modal";
import ProtectedRoute from './ProtectedRoute'
import "react-router-modal/css/react-router-modal.css";

import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import App from './pages/App'

const Routes = () => (
  <BrowserRouter>
  <Fragment>
      <Switch>
        <Route exact path="/" component={SignIn} />
        <Route path="/signup" component={SignUp} />
        <ProtectedRoute path="/app" component={App} />
        <Route path="*" component={() => <h1>Not found</h1>} />
      </Switch>
      <ModalContainer />
    </Fragment>
  </BrowserRouter>
)

export default Routes