import React from 'react';
import { Route } from "react-router-dom";

import { Auth } from './pages';

const App = () => {
  return (
    <div className="wrapper">
      <Route exact path={["/signup", "/signin", "/"]} component={Auth} />
    </div>
  );
}

export default App;
