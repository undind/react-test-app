import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from "react-redux";
import usersActions from "redux/actions/users";

import App from './App';

import store from "redux/store";

import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

store.dispatch(usersActions.getUserData())

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);
