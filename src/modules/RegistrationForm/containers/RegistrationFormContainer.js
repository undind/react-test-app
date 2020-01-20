import React, { useState } from 'react';
import RegistrationForm from '../components/RegistrationForm';

import db from 'db';

import useValidateForm from 'hooks/useValidateForm';
import validateRegistration from 'utils/validateRegistration';

const RegistrationFormContainer = props => {
  const [ errMessage, setErrMessage ] = useState({
    status: false,
    text: ''
  });

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
          setErrMessage({
            status: true,
            text: 'Пользователь с таким логином уже существует!'
          });
          setTimeout(() => {
            setErrMessage({
              status: false
            })
          }, 3000);
        }

        if (positionOfError.includes('email')) {
          setErrors({
            email: "Пользователь с такой почтой уже сущесвтвует!"
          })
          values.email = "";
          values.password = "";
          values.password_2 = "";
          setErrMessage({
            status: true,
            text: 'Пользователь с такой почтой уже сущесвтвует!'
          });
          setTimeout(() => {
            setErrMessage({
              status: false
            })
          }, 3000);
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

  return (

    <RegistrationForm 
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleBlur={handleBlur}
      errors={errors}
      values={values}
      isSubmitting={isSubmitting}
      errMessage={errMessage}
    />

  )
};

export default RegistrationFormContainer;