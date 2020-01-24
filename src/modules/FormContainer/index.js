import React from "react";
import FormUI from "components/Form";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";

import db from "db";

import useValidateForm from "hooks/useValidateForm";
import validateLogin from "utils/validateLogin";
import validateRegistration from "utils/validateRegistration";

const FormContainer = ({ INITIAL_STATE, isSignin }) => {
  let history = useHistory();

  const submitFunction = async () => {
    const { login, email, password, password_2 } = values;

    if (isSignin) {
      await db.users
        .get({ login }, user => user.password === password)
        .then(auth => {
          if (auth) {
            toast.success("Добро пожаловать!");
            window.localStorage.setItem("isAuth", "true");
            setSubmitting(true)
            history.push("/");
          } else {
            setValues({
              ...values,
              password: ''
            })
            toast.error("Введен не верный логин или пароль");
          }
        })
        .catch(() => {
          values.password = "";
          toast.error("Такой пользователь не зарегистрирован!");
        });
    } else {
      await db.users
        .add({ login, email, password, password_2 })
        .then(() => {
          setSubmitting(true);
          history.push("/signin");
          toast.success("Регистрация прошла успешно, можете войти в аккаунт");
        })
        .catch(e => {
          const positionOfError = e.message;

          if (positionOfError.includes("login")) {
            setValues({
              ...values,
              login: '',
              password: '',
              password_2: ''
            })
            toast.error("Пользователь с таким логином уже существует!");
          }

          if (positionOfError.includes("email")) {
            setValues({
              ...values,
              email: '',
              password: '',
              password_2: ''
            })
            toast.error("Пользователь с такой почтой уже существует!");
          }
        });
    }
  };

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    setValues,
    errors,
    isSubmitting,
    setSubmitting
  } = useValidateForm(
    INITIAL_STATE,
    isSignin ? validateLogin : validateRegistration,
    submitFunction
  );

  const renderFormColumnsInput = (obj, isSignin) => {
    const arr = Object.keys(obj).map(item => {
      let placeholderText = item === 'password' ? 'пароль' : item === 'email' ? 'email' : item === 'password_2' ? 'повторно пароль' : 'логин';  
      return {
        name: item,
        type: item === 'password' || item === 'password_2' ? 'password' : item === 'email' ? 'email' : 'text',
        placeholder: `Введите ${placeholderText}`,
        value: values[item],
        error: errors[item]
      }
    })

    const signInInfo = {
      heading: "Вход в аккаунт",
      paragraf: "Пожалуйста, войдите в свой аккаунт",
      btnText: "Войти в аккаунт",
      linkText: "Зарегестрироваться",
      linkTo: "/signup"
    }

    const signUpInfo = {
      heading: "Регистрация",
      paragraf: `Для входа в аккаунт, пожалуйста зарегистрируйтесь`,
      btnText: "Зарегестрироваться",
      linkText: "Войти в аккаунт",
      linkTo: "/signin"
    }

    if (isSignin) {
      arr[0] = { ...arr[0], ...signInInfo }
    } else {
      arr[0] = { ...arr[0], ...signUpInfo }
    }

    return arr;
  }

  return (
    <FormUI
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleBlur={handleBlur}
      isSubmitting={isSubmitting}
      renderFormColumnsInput={() => renderFormColumnsInput(INITIAL_STATE, isSignin)}
    />
  );
};

FormContainer.propTypes = {
  INITIAL_STATE: PropTypes.object,
  isSignin: PropTypes.bool
};

export default FormContainer;
