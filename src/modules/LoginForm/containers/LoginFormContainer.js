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

    try {
      const user = await db.users.where('login').equals(login).and(user => user.password === password).toArray();

      if (user.length) {
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
    } catch(e) {
      setErrMessage({
        status: true,
        text: 'Ошибка при попытке авторизации'
      });
        setTimeout(() => {
          setErrMessage({
            status: false
          });
        }, 3000);
    }
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
