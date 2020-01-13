import React, { useState } from 'react';
import RegistrationForm from '../components/RegistrationForm';

import db from 'db';

import useValidateForm from 'hooks/useValidateForm';
import validateRegistration from 'utils/validateRegistration';

const RegistrationFormContainer = props => {
  const [ errMessage, setErrMessage ] = useState(false);

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
      .catch(() => {
        values.password = "";
        values.password_2 = "";
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