import React, { useEffect } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";

import { Auth, Home } from './pages';

const App = () => {
  const getLocalAuth = () => {
    const isAuth = window.localStorage.getItem('isAuth');
    return isAuth === 'true';
  }

  useEffect(() => {
    getLocalAuth()
  }, [])

  return (
    <div className="wrapper">
      <Switch>
        <Route exact path={["/signup", "/signin"]} component={Auth} />
        <Route path="/" render={ () => ( getLocalAuth() ? <Home /> : <Redirect to="/signup" /> ) } />
      </Switch>
    </div>
  );
}

export default App;
