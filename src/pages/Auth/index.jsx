import React from "react";
import { Route } from "react-router-dom";

import FormContainer from "modules/FormContainer";

const Auth = () => {
  const INITIAL_STATE_SIGNIN = {
    login: "",
    password: ""
  };

  const INITIAL_STATE_SIGNUP = {
    login: "",
    email: "",
    password: "",
    password_2: ""
  };
  
  return (
    <section className="auth">
      <Route exact path="/signin" component={() => <FormContainer INITIAL_STATE={INITIAL_STATE_SIGNIN} isSignin={true} />} />
      <Route exact path="/signup" component={() => <FormContainer INITIAL_STATE={INITIAL_STATE_SIGNUP} isSignin={false} />} />
    </section>
  );
};

export default Auth;
