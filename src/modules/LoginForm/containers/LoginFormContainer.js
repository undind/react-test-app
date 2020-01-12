import React, { useState } from 'react';
import LoginForm from "../components/LoginForm";

import db from 'db';

import useValidateForm from 'hooks/useValidateForm';
import validateLogin from 'utils/validateLogin';

const LoginFormContainer = props => {
  const [errMessage, setErrMessage] = useState(false);

  const INITIAL_STATE = {
    login: '',
    password: ''
  }

  const submitFunction = async () => {
    const { login, password } = values;
    
    await db.users
      .get({ login, password })
      .then((user) => {
        if (user.login === login && user.password === password) {
          window.localStorage.setItem('isAuth', 'true');
          props.history.push('/')
        }
      })
      .catch(() => {
        values.password = "";
        setErrMessage(true);
        setTimeout(() => {
          setErrMessage(false)
        }, 3000);
      })
  }

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isSubmitting
  } = useValidateForm(INITIAL_STATE, validateLogin, submitFunction);

  return (
    <LoginForm 
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleBlur={handleBlur}
      values={values}
      errors={errors}
      isSubmitting={isSubmitting}
      errMessage={errMessage}
    />
  )
};

export default LoginFormContainer;
