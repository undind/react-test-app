import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import { Container, Col, Form, FormGroup, Input, Button } from "reactstrap";

const FormUI = ({
  handleSubmit,
  handleChange,
  handleBlur,
  isSubmitting,
  renderFormColumnsInput
}) => {
  const {
    heading,
    paragraf,
    linkTo,
    btnText,
    linkText
  } = renderFormColumnsInput()[0];

  return (
    <Container className="vh-100">
      <div className="d-flex align-items-center justify-content-center h-100">
        <div className="text-center col-md-8 col-lg-6 col-xl-5">
          <h2>{heading}</h2>
          <p className="lead">{paragraf}</p>

          <Form
            onSubmit={handleSubmit}
            className="form d-flex flex-column bg-white text-center rounded p-4 shadow"
          >
            {renderFormColumnsInput().map((item, i) => (
              <Col key={i} className="mt-3 mb-2 mr-5 p-0">
                <FormGroup className="text-left position-relative">
                  <Input
                    invalid={item.error ? true : false}
                    type={item.type}
                    name={item.name}
                    className="p-3"
                    placeholder={item.placeholder}
                    bsSize="lg"
                    value={item.value || ""}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    disabled={isSubmitting}
                  />
                  {item.error && (
                    <div className="invalid-tooltip">{item.error}</div>
                  )}
                </FormGroup>
              </Col>
            ))}

            <Button
              type="submit"
              disabled={isSubmitting}
              color="primary"
              className="btn-lg btn-block mb-4 d-flex justify-content-center align-items-center"
            >
              {isSubmitting && (
                <span className="spinner-border spinner-border-sm mr-3"></span>
              )}
              {btnText}
            </Button>
            {!isSubmitting && <Link to={linkTo}>{linkText}</Link>}
          </Form>
        </div>
      </div>
    </Container>
  );
};

FormUI.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  handleBlur: PropTypes.func,
  isSubmitting: PropTypes.bool,
  renderFormColumn: PropTypes.func
};

export default FormUI;
