import React, { useState } from 'react';
import LoginForm from "../components/LoginForm";

import db from 'db';

import useValidateForm from 'hooks/useValidateForm';
import validateLogin from 'utils/validateLogin';

const LoginFormContainer = props => {
  const [errMessage, setErrMessage] = useState({
    status: false,
    text: ''
  });

  const INITIAL_STATE = {
    login: '',
    password: ''
  }

  const submitFunction = async () => {
    const { login, password } = values;

    await db.users.get({login}, user => user.password === password).then((auth) => {
      if (auth) {
        window.localStorage.setItem('isAuth', 'true');
        props.history.push('/');
      } else {
        values.password = "";
        setErrMessage({
          status: true,
          text: 'Введен не верный логин или пароль'
        });
        setTimeout(() => {
          setErrMessage({
            status: false
          });
        }, 3000);
      }
    }).catch((e) => {
      values.password = "";
      setErrMessage({
        status: true,
        text: 'Такой пользователь не зарегистрирован!'
      });
      setTimeout(() => {
        setErrMessage({
          status: false
        });
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
