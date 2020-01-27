import { SET_IS_REGIST, SET_USER_DATA, SET_IS_AUTH } from "../types";

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

  setUserIsAuth: bool => ({
    type: SET_IS_AUTH,
    payload: bool
  }),

  fetchAuth: ({ login, password }) => dispatch => {
    return db.users
      .get({ login }, user => (user.password === password ? user.id : null))
      .then(auth => {
        if (!auth) {
          toast.error("Введен не верный логин или пароль");
          return auth;
        } else {
          
          dispatch(Actions.setUserData({ login, password }));
          dispatch(Actions.setUserIsAuth(true));

          toast.success("Добро пожаловать!");

          window.localStorage.setItem("isAuth", "true");
          window.localStorage.setItem("userId", auth);
          
          return auth;
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
      .then(id => {
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
  },

  getUserData: () => dispatch => {
    const userId = Number(window.localStorage.getItem('userId'));
    return db.users
      .get(userId)
      .then(({ login, password }) => {
        dispatch(Actions.setUserData({ login, password }));
        dispatch(Actions.setUserIsAuth(true));
      })
      .catch(() => {
        dispatch(Actions.setUserIsAuth(false));
      });
  },
};

export default Actions;
