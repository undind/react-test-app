import React from 'react';
import { Link } from "react-router-dom";

import { Container, Col, Form, FormGroup, Input, Button } from 'reactstrap';

const FormUI = ({ handleSubmit, handleChange, handleBlur, isSubmitting, renderColumnForm }) => {
  const { heading, paragraf, linkTo, btnText, linkText } = renderColumnForm[0];

  return (
    <Container className="vh-100">
      <div className="d-flex align-items-center justify-content-center h-100">
        <div className="text-center">

          <h2>{heading}</h2>
          <p className="lead" style={{maxWidth: '400px', width: '400px'}}>{paragraf}</p>

          <Form onSubmit={handleSubmit} className="form d-flex flex-column bg-white text-center rounded p-4 shadow">
            {renderColumnForm.map((item, i)=> (
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

            <Button type="submit" disabled={isSubmitting} color="primary" className="btn-lg btn-block mb-4">{btnText}</Button>
            <Link to={linkTo}>{linkText}</Link>
          </Form>

        </div>
      </div>
    </Container>
  )
};

export default FormUI;
