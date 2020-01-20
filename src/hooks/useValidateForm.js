import { useState, useEffect } from "react";

const useFormValidation = (initialState, validate, runOnSubmit) => {
  const [values, setValues] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState([]);
  const [isSubmitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        setTouched([]);
        setSubmitting(false);
        runOnSubmit();
      } else {
        setSubmitting(false);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors]);

  useEffect(() => {
    const validationErrors = validate(values);
    const touchedErrors = Object.keys(validationErrors)
      .filter(key => touched.includes(key))
      .reduce((acc, key) => {
        if (!acc[key]) {
          acc[key] = validationErrors[key]
        }
        return acc
      }, {})
    setErrors(touchedErrors);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [touched, values]);

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  }

  const handleBlur = (event) => {
    if (!touched.includes(event.target.name)) {
      setTouched([
          ...touched,
          event.target.name
      ])
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);
    const validationErrors = validate(values);
    setErrors(validationErrors);
  }

  return {
    handleSubmit,
    handleChange,
    handleBlur,
    values,
    errors,
    isSubmitting,
    setErrors
  };
}

export default useFormValidation;