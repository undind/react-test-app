import React from 'react';
import { Route, Switch, Redirect } from "react-router-dom";

import { Auth, Home } from './pages';

const App = () => {
  const isAuth = window.localStorage.getItem('isAuth')

  return (
    <div className="wrapper">
      <Route path={["/signup", "/signin"]} component={Auth} />
      <Route path="/" render={ () => ( isAuth === 'true' ? <Home/> : <Redirect to="/signin" /> ) } />
    </div>
  );
}

export default App;
