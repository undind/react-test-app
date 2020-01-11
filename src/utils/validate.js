const validate = (values) => {
  const errors = {};

  if (!values.login) {
    errors.login = "Введите логин";
  }

  if (!values.email) {
    errors.email = "Пожалуйста введите Ваш email";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Не корректный email";
  }

  if (values.password.length < 5) {
    errors.password = "Минимальная длина 5 символов";
  } else if (values.password.length > 16) {
    errors.password = "Максимальная длина 16 символов";
  }

  if (!values.password_2) {
    errors.password_2 = "Повторите пароль";
  } else if (values.password_2 !== values.password) {
    errors.password_2 = "Пароли не совпадают";
  }

  return errors;
}

export default validate;