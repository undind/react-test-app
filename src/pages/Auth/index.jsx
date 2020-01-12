import React from 'react';
import { Route } from "react-router-dom";

import { LoginFormContainer, RegistrationFormContainer } from "modules";

const Auth = () => (
  <section className="auth">
    <Route exact path="/signup" component={RegistrationFormContainer} />
    <Route exact path="/signin" component={LoginFormContainer} />
  </section>
);

export default Auth;