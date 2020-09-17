import axios from "axios";
import jwtDecode from "jwt-decode";
import setAuthToken from "../setAuthToken";
import { INDICATE_NO_ERRORS, GET_ERRORS, SET_CURRENT_USER } from "./actionType";

export const registerUser = (user) => (dispatch) => {
  axios
    .post("http://localhost:4000/user/signup", user)
    .then((res) => {
      dispatch({
        type: INDICATE_NO_ERRORS,
        payload: {
          success: true,
        },
      });
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const loginUser = (user) => (dispatch) => {
  axios
    .post("http://localhost:4000/user/login", user)
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      });
    });
};

export const setCurrentUser = (decoded) => ({
  type: SET_CURRENT_USER,
  payload: decoded,
});

export const updateCurrentUser = (email, name, userId) => (dispatch) =>
  axios
    .patch(`http://localhost:4000/user/${userId}`, { email, name, userId })
    .then((res) => {
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      setAuthToken(token);
      const decoded = jwtDecode(token);
      dispatch(setCurrentUser(decoded));
    })
    .catch((err) => console.log(err));

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setAuthToken(false);
  dispatch(setCurrentUser({}));
  window.location.href = "/login";
};

export const deleteUser = (id) => (dispatch) => {
  localStorage.removeItem("jwtToken");
  axios.delete(`http://localhost:4000/user/${id}`, { id }).then((res) => {
    dispatch(setCurrentUser({}));
    window.location.href = "/login";
  });
};
