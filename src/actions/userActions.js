import axios from "axios";
import {
  GET_USER,
  GET_ALL_USERS,
  UPDATE_ADDICS,
  GET_ADDICS,
  UPDATE_ADDICPIN,
} from "./actionType";

export const getUser = (userId) => async (dispatch) => {
  const result = await axios.get(`http://localhost:4000/user/${userId}`);
  return dispatch({
    type: GET_USER,
    payload: result.data,
  });
};

export const getAllUsers = () => async (dispatch) => {
  const result = await axios.get("http://localhost:4000/user");
  return dispatch({
    type: GET_ALL_USERS,
    payload: result.data,
  });
};

export const addAddic = (signInUserId, name) => async (dispatch) => {
  const AddicResult = await axios.patch(
    `http://localhost:4000/user/addAddic/${signInUserId}`,
    {
      name,
    }
  );

  dispatch({
    type: UPDATE_ADDICS,
    payload: AddicResult.data,
  });
};

export const removeAddic = (signInUserId, removeId) => async (dispatch) => {
  const removeResult = await axios.patch(
    `http://localhost:4000/user/removeAddic/${signInUserId}`,
    {
      removeId,
    }
  );

  dispatch({
    type: UPDATE_ADDICS,
    payload: removeResult.data,
  });
};

export const getAddics = (userId) => async (dispatch) => {
  const result = await axios.get(`http://localhost:4000/user/${userId}`);
  return dispatch({
    tpye: GET_ADDICS,
    payload: result.data,
  });
};

export const addpin = (signInUserId, addicId) => async (dispatch) => {
  const AddicResult = await axios.patch(
    `http://localhost:4000/user/addPin/${signInUserId}`,
    {
      addicId,
    }
  );

  dispatch({
    type: UPDATE_ADDICPIN,
    payload: AddicResult.data,
  });
};
