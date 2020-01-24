import React, { useEffect } from 'react';
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Auth from 'pages/Auth';
import Home from 'pages/Home';

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
        <Route path={['/signin', '/signup']} render={ () => ( getLocalAuth() ? <Redirect push to="/home" /> : <Auth /> ) } />
        <Route path="/home" render={ () => ( getLocalAuth() ? <Home /> : <Redirect push to="/signup" /> ) } />
      </Switch>
      <Redirect from="/" to={{
          pathname: "/home",
          search: "?page=1"
        }} />
      <ToastContainer autoClose={3000} hideProgressBar={true} />
    </div>
  );
}

export default App;
