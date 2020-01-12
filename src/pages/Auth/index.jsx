import React from 'react';
import { Route } from "react-router-dom";

import { LoginForm, RegistrationForm } from "modules";

const Auth = () => (
  <section className="auth">
    <Route exact path="/signup" component={RegistrationForm} />
    <Route exact path="/signin" component={LoginForm} />
  </section>
);

export default Auth;