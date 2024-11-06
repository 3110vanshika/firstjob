import { LOGOUT, SET_USER } from "./constant";

export const loginUser = (user, token) => {
    return dispatch => {
      localStorage.setItem('token', token); // Store token in local storage
      dispatch(setUser(user, token)); // Store user data and token in Redux store
    };
  };

export const setUser = (user, token) => ({
    type: SET_USER,
    payload: {user, token},
});

export const logoutUser = () => {
    type: LOGOUT
}