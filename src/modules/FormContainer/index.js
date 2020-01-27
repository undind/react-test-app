import React from "react";
import FormUI from "components/Form";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import usersActions from "redux/actions/users";

import useValidateForm from "hooks/useValidateForm";
import validateLogin from "utils/validateLogin";
import validateRegistration from "utils/validateRegistration";

const FormContainer = ({
  INITIAL_STATE,
  isSignin,
  fetchAuth,
  fetchRegistr
}) => {
  let history = useHistory();

  const submitFunction = () => {
    const { login, email, password, password_2 } = values;

    if (isSignin) {
      fetchAuth({ login, password })
        .then(auth => {
          if (auth) {
            setSubmitting(true);
            setTimeout(() => {
              history.push("/");
            }, 2000);
          } else {
            setValues({
              login: "",
              password: ""
            });
          }
        })
        .catch(() => {
          setValues({
            login: "",
            password: ""
          });
        });
    } else {
      fetchRegistr({ login, email, password, password_2 }).then(result => {
        if (result) {
          setSubmitting(true);
          return history.push("/signin");
        }

        setValues({
          login: "",
          email: "",
          password: "",
          password_2: ""
        });
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
      let placeholderText =
        item === "password"
          ? "пароль"
          : item === "email"
          ? "email"
          : item === "password_2"
          ? "повторно пароль"
          : "логин";
      return {
        name: item,
        type:
          item === "password" || item === "password_2"
            ? "password"
            : item === "email"
            ? "email"
            : "text",
        placeholder: `Введите ${placeholderText}`,
        value: values[item],
        error: errors[item]
      };
    });

    const signInInfo = {
      heading: "Вход в аккаунт",
      paragraf: "Пожалуйста, войдите в свой аккаунт",
      btnText: "Войти в аккаунт",
      linkText: "Зарегестрироваться",
      linkTo: "/signup"
    };

    const signUpInfo = {
      heading: "Регистрация",
      paragraf: `Для входа в аккаунт, пожалуйста зарегистрируйтесь`,
      btnText: "Зарегестрироваться",
      linkText: "Войти в аккаунт",
      linkTo: "/signin"
    };

    if (isSignin) {
      arr[0] = { ...arr[0], ...signInInfo };
    } else {
      arr[0] = { ...arr[0], ...signUpInfo };
    }

    return arr;
  };

  return (
    <FormUI
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleBlur={handleBlur}
      isSubmitting={isSubmitting}
      renderFormColumnsInput={() =>
        renderFormColumnsInput(INITIAL_STATE, isSignin)
      }
    />
  );
};

FormContainer.propTypes = {
  INITIAL_STATE: PropTypes.object,
  isSignin: PropTypes.bool,
  fetchAuth: PropTypes.func,
  fetchRegistr: PropTypes.func
};

export default connect((users) => users, usersActions)(FormContainer);
