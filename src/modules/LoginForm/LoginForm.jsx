import React from 'react';
import { Link } from "react-router-dom";

import { Container, Col, Form, FormGroup, Input, Button } from 'reactstrap';

const LoginForm = props => {
  return (
    <Container className="vh-100">
      <div className="d-flex align-items-center justify-content-center h-100">
        <div className="text-center">
          <h2>Вход в аккаунт</h2>
          <p className="lead">Пожалуйста, водите в свой аккаунт</p>
          <Form className="form d-flex flex-column bg-white text-center rounded p-4 shadow">
            <Col className="mt-3 mr-5">
              <FormGroup className="text-left">
                <Input
                  type="text"
                  name="text"
                  placeholder="Ваш логин"
                  bsSize="lg"
                />
              </FormGroup>
            </Col>
            <Col className="mb-3 mr-5">
              <FormGroup className="text-left">
                <Input
                  type="password"
                  name="password"
                  placeholder="Пароль"
                  bsSize="lg"
                />
              </FormGroup>
            </Col>
            <Button color="primary" className="btn-lg btn-block mb-4">Войти в аккаунт</Button>
            <Link to="/signup">Зарегестрироваться</Link>
          </Form>
        </div>
      </div>
    </Container>
  )
};

export default LoginForm;
