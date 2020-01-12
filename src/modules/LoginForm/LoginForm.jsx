import React from 'react';
import { Link } from "react-router-dom";

import db from 'db';

import { Container, Col, Form, FormGroup, Input, Button } from 'reactstrap';
import useValidateForm from 'hooks/useValidateForm';
import validateLogin from 'utils/validateLogin';

const LoginForm = props => {
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
        alert('Такого пользователя не существует или допущенна ошибка при вводе данных')
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
    <Container className="vh-100">
      <div className="d-flex align-items-center justify-content-center h-100">
        <div className="text-center">
          <h2>Вход в аккаунт</h2>
          <p className="lead">Пожалуйста, водите в свой аккаунт</p>
          <Form onSubmit={handleSubmit} className="form d-flex flex-column bg-white text-center rounded p-4 shadow">
            <Col className="mt-3 mb-2 mr-5 p-0">
              <FormGroup className="text-left position-relative">
                <Input
                  invalid={errors.login ? true : false}
                  type="text"
                  name="login"
                  className="p-3"
                  placeholder="Ваш логин"
                  bsSize="lg"
                  onChange={handleChange}
                  value={values.login || ''}
                  onBlur={handleBlur}
                />
                {errors.login && <div className="invalid-tooltip">{errors.login}</div>}
              </FormGroup>
            </Col>
            <Col className="mr-5 mb-3 p-0">
              <FormGroup className="text-left position-relative">
                <Input
                  invalid={errors.password ? true : false}
                  type="password"
                  name="password"
                  className="p-3"
                  placeholder="Пароль"
                  bsSize="lg"
                  onChange={handleChange}
                  value={values.password || ''}
                  onBlur={handleBlur}
                />
                {errors.password && <div className="invalid-tooltip">{errors.password}</div>}
              </FormGroup>
            </Col>
            <Button disabled={isSubmitting} color="primary" className="btn-lg btn-block mb-4">Войти в аккаунт</Button>
            <Link to="/signup">Зарегестрироваться</Link>
          </Form>
        </div>
      </div>
    </Container>
  )
};

export default LoginForm;
