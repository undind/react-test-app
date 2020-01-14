const validateLogin = (values) => {
  const errors = {};

  if (!values.login) {
    errors.login = "Введите логин";
  }

  if (values.password.length < 6) {
    errors.password = "Минимальная длина 6 символов";
  } else if (values.password.length > 16) {
    errors.password = "Максимальная длина 16 символов";
  }

  return errors;
}

export default validateLogin;