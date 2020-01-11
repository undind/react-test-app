import React from 'react';
import { Link } from "react-router-dom";

import { Container, Col, Form, FormGroup, Input, Button } from 'reactstrap';

const RegistrationForm = props => {
  return (
    <Container className="vh-100">
      <div className="d-flex align-items-center justify-content-center h-100">
        <div className="text-center">
          <h2>Регистрация</h2>
          <p className="lead">Для входа в аккаунт,<br /> пожалуйста зарегистрируйтесь</p>
          <Form className="form d-flex flex-column bg-white text-center rounded p-4 shadow">
            <Col className="mt-3 mr-5">
              <FormGroup className="text-left">
                <Input
                  type="text"
                  name="login"
                  placeholder="Ваш логин"
                  bsSize="lg"
                />
              </FormGroup>
            </Col>
            <Col className="mr-5">
              <FormGroup className="text-left">
                <Input
                  type="email"
                  name="email"
                  placeholder="Email"
                  bsSize="lg"
                />
              </FormGroup>
            </Col>
            <Col className="mr-5">
              <FormGroup className="text-left">
                <Input
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  bsSize="lg"
                />
              </FormGroup>
            </Col>
            <Col className="mb-3 mr-5">
              <FormGroup className="text-left">
                <Input
                  type="password"
                  name="password_2"
                  placeholder="Повторите пароль"
                  bsSize="lg"
                />
              </FormGroup>
            </Col>
            <Button color="primary" className="btn-lg btn-block mb-4">Зарегестрироваться</Button>
            <Link to="/signin">Войти в аккаунт</Link>
          </Form>
        </div>
      </div>
    </Container>
  )
};

export default RegistrationForm;