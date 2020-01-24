import { SET_IS_REGIST, SET_USER_DATA } from "../types";

import { toast } from "react-toastify";
import db from "db";

const Actions = {
  setUserData: data => ({
    type: SET_USER_DATA,
    payload: data
  }),

  setIsRegistr: bool => ({
    type: SET_IS_REGIST,
    payload: bool
  }),

  fetchAuth: ({ login, password }) => dispatch => {
    return db.users
      .get({ login }, user => user.password === password)
      .then(auth => {
        if (!auth) {
          toast.error("Введен не верный логин или пароль");
          return false;
        } else {
          dispatch(Actions.setUserData({ login, password }));
          toast.success("Добро пожаловать!");
          window.localStorage.setItem("isAuth", "true");
          return true;
        }
      })
      .catch(() => {
        toast.error("Такой пользователь не зарегистрирован!");
        return false;
      });
  },

  fetchRegistr: ({ login, email, password, password_2 }) => dispatch => {
    return db.users
      .add({ login, email, password, password_2 })
      .then(() => {
        toast.success("Регистрация прошла успешно, можете войти в аккаунт");
        dispatch(Actions.setIsRegistr(true));
        return true;
      })
      .catch(e => {
        const positionOfError = e.message;

        if (positionOfError.includes("login")) {
          toast.error("Пользователь с таким логином уже существует!");
          return false;
        }

        if (positionOfError.includes("email")) {
          toast.error("Пользователь с такой почтой уже существует!");
          return false;
        }
      });
  }
};

export default Actions;
