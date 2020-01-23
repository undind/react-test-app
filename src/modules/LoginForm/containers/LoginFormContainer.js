import React from "react";
import FormUI from "components/Form";
import { toast } from "react-toastify";

import db from "db";

import useValidateForm from "hooks/useValidateForm";
import validateLogin from "utils/validateLogin";

const LoginFormContainer = props => {
  const INITIAL_STATE = {
    login: "",
    password: ""
  };

  const submitFunction = async () => {
    const { login, password } = values;

    await db.users
      .get({ login }, user => user.password === password)
      .then(auth => {
        if (auth) {
          toast.success("Добро пожаловать!");
          window.localStorage.setItem("isAuth", "true");
          props.history.push("/");
        } else {
          values.password = "";
          toast.error("Введен не верный логин или пароль");
        }
      })
      .catch(() => {
        values.password = "";
        toast.error("Такой пользователь не зарегистрирован!");
      });
  };

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isSubmitting
  } = useValidateForm(INITIAL_STATE, validateLogin, submitFunction);

  const renderColumnForm = [
    {
      name: "login",
      type: "text",
      placeholder: "Ваш логин",
      value: values.login,
      error: errors.login,
      heading: "Вход в аккаунт",
      paragraf: "Пожалуйста, войдите в свой аккаунт",
      btnText: "Войти в аккаунт",
      linkText: "Зарегестрироваться",
      linkTo: "/signup"
    },
    {
      name: "password",
      type: "password",
      placeholder: "Ваш пароль",
      value: values.password,
      error: errors.password
    }
  ];

  return (
    <FormUI
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleBlur={handleBlur}
      isSubmitting={isSubmitting}
      renderColumnForm={renderColumnForm}
    />
  );
};

export default LoginFormContainer;
