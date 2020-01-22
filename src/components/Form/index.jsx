import React, { Fragment } from 'react';
import { Link } from "react-router-dom";

import { Container, Col, Form, FormGroup, Input, Button } from 'reactstrap';

const FormUI = ({ isLogin, handleSubmit, handleChange, handleBlur, isSubmitting, renderColumnForm }) => {
  return (
    <Container className="vh-100">
      <div className="d-flex align-items-center justify-content-center h-100">
        <div className="text-center">
          {isLogin ? (
            <Fragment>
              <h2>Вход в аккаунт</h2>
              <p className="lead">Пожалуйста, войдите в свой аккаунт</p>
            </Fragment>
          ) : (
            <Fragment>
              <h2>Регистрация</h2>
              <p className="lead">Для входа в аккаунт,<br /> пожалуйста зарегистрируйтесь</p>
            </Fragment>
          )}

          <Form onSubmit={handleSubmit} className="form d-flex flex-column bg-white text-center rounded p-4 shadow">
            {renderColumnForm().map((item, i)=> (
              <Col key={i} className="mt-3 mb-2 mr-5 p-0">
                <FormGroup className="text-left position-relative">
                  <Input
                    invalid={item.error ? true : false}
                    type={item.type}
                    name={item.name}
                    className="p-3"
                    placeholder={item.placeholder}
                    bsSize="lg"
                    value={item.value || ''}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {item.error && <div className="invalid-tooltip">{item.error}</div>}
                </FormGroup>
              </Col>
            ))}
            {isLogin ? (
              <Fragment>
                <Button disabled={isSubmitting} color="primary" className="btn-lg btn-block mb-4">Войти в аккаунт</Button>
                <Link to="/signup">Зарегестрироваться</Link>
              </Fragment>
              ) : (
              <Fragment>
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  color="primary" 
                  className="btn-lg btn-block mb-4"
                >Зарегестрироваться</Button>
                <Link to="/signin">Войти в аккаунт</Link>
              </Fragment>
            )}
          </Form>

        </div>
      </div>
    </Container>
  )
};

export default FormUI;
