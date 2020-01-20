import React from 'react';
import { Link } from "react-router-dom";

import { Container, Col, Form, FormGroup, Input, Button, Alert } from 'reactstrap';

const RegistrationForm = ({ handleSubmit, handleChange, handleBlur, errors, isSubmitting, errMessage, values }) => {
  return (
    <Container className="vh-100">
      {errMessage.status && <Alert color="danger" className="text-center fixed-top">
        {errMessage.text}
      </Alert>}
      <div className="d-flex align-items-center justify-content-center h-100">
        <div className="text-center">
          <h2>Регистрация</h2>
          <p className="lead">Для входа в аккаунт,<br /> пожалуйста зарегистрируйтесь</p>
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
            <Col className="mr-5 mb-2 p-0">
              <FormGroup className="text-left position-relative">
                <Input
                  invalid={errors.email ? true : false}
                  type="email"
                  name="email"
                  className="p-3"
                  placeholder="Email"
                  bsSize="lg"
                  onChange={handleChange}
                  value={values.email || ''}
                  onBlur={handleBlur}
                />
                {errors.email && <div className="invalid-tooltip">{errors.email}</div>}
              </FormGroup>
            </Col>
            <Col className="mr-5 mb-2 p-0">
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
            <Col className="mb-3 mr-5 p-0">
              <FormGroup className="text-left position-relative">
                <Input
                  invalid={errors.password_2 ? true : false}
                  type="password"
                  name="password_2"
                  className="p-3"
                  placeholder="Повторите пароль"
                  bsSize="lg"
                  onChange={handleChange}
                  value={values.password_2 || ''}
                  onBlur={handleBlur}
                />
                {errors.password_2 && <div className="invalid-tooltip">{errors.password_2}</div>}
              </FormGroup>
            </Col>
            <Button 
              type="submit" 
              disabled={isSubmitting} 
              color="primary" 
              className="btn-lg btn-block mb-4"
            >Зарегестрироваться</Button>
            <Link to="/signin">Войти в аккаунт</Link>
          </Form>
        </div>
      </div>
    </Container>
  )
};

export default RegistrationForm;