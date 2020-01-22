import React from 'react';
import FormUI from 'components/Form';
import { toast } from "react-toastify";

import db from 'db';

import useValidateForm from 'hooks/useValidateForm';
import validateRegistration from 'utils/validateRegistration';

const RegistrationFormContainer = props => {

  const INITIAL_STATE = {
    login: '',
    email: '',
    password: '',
    password_2: ''
  }

  const submitFunction = async () => {
    const { login, email, password, password_2 } = values;

    await db.users
      .add({ login, email, password, password_2 })
      .then(() => {
        toast.success("Регистрация прошла успешно, можете войти в аккаунт")
        props.history.push('/signin')
      })
      .catch((e) => {
        const positionOfError = e.message;
        
        if (positionOfError.includes('login')) {
          setErrors({
            login: "Пользователь с таким логином уже существует!"
          })
          values.login = "";
          values.password = "";
          values.password_2 = "";
          toast.error("Пользователь с таким логином уже существует!")
        }

        if (positionOfError.includes('email')) {
          setErrors({
            email: "Пользователь с такой почтой уже сущесвтвует!"
          })
          values.email = "";
          values.password = "";
          values.password_2 = "";
          toast.error("Пользователь с такой почтой уже существует!")
        }
      })
  }

  const {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    setErrors,
    isSubmitting
} = useValidateForm(INITIAL_STATE, validateRegistration, submitFunction);

const renderColumnForm = () => {
  return [
    {
      name: 'login',
      type: 'text',
      placeholder: 'Ваш логин',
      value: values.login,
      error: errors.login
    },
    {
      name: 'email',
      type: 'email',
      placeholder: 'Ваша почта',
      value: values.email,
      error: errors.email
    },
    {
      name: 'password',
      type: 'password',
      placeholder: 'Ваш пароль',
      value: values.password,
      error: errors.password
    },
    {
      name: 'password_2',
      type: 'password',
      placeholder: 'Повторите пароль',
      value: values.password_2,
      error: errors.password_2
    },
    
  ]
}

  return (
    <FormUI 
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleBlur={handleBlur}
      isSubmitting={isSubmitting}
      renderColumnForm={renderColumnForm}
    />
  )
};

export default RegistrationFormContainer;