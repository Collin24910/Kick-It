import axios from "axios";
import {
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  GET_ADDICS,
  GET_ADDIC,
  CREATE_ADDIC,
  EDIT_ADDIC,
  DELETE_ADDIC,
  UPDATE_ADDIC_LIKES,
  UPDATE_TIMESTAMP,
  UPDATE_CARDCOLOR,
} from "./actionType";

export const addComment = (action, commenterId, postId, text, timestamp) => (
  dispatch
) =>
  axios
    .patch(`http://localhost:4000/post/${postId}`, {
      action,
      commenterId,
      text,
      timestamp,
    })
    .then((res) =>
      dispatch({
        type: ADD_COMMENT,
        payload: res.data,
        commenterId,
        text,
        timestamp,
      })
    );

export const deleteComment = (action, commentId, postId) => (dispatch) =>
  axios
    .patch(`http://localhost:4000/post/${postId}`, { action, commentId })
    .then((res) =>
      dispatch({
        type: DELETE_COMMENT,
        payload: res.data,
      })
    );

export const editComment = (action, commentId, postId, text) => (dispatch) =>
  axios
    .patch(`http://localhost:4000/post/${postId}`, { action, commentId, text })
    .then((res) =>
      dispatch({
        type: EDIT_COMMENT,
        payload: res.data,
      })
    );

export const getAddics = () => (dispatch) =>
  axios.get("http://localhost:4000/post/").then((res) =>
    dispatch({
      type: GET_ADDICS,
      payload: res.data,
    })
  );

export const createAddic = (name, user) => (dispatch) =>
  axios
    .post("http://localhost:4000/post/", {
      authorId: user.userId,
      name,
    })
    .then((res) =>
      dispatch({
        type: CREATE_ADDIC,
        payload: res.data,
      })
    );

export const editAddic = (id, name, author, goal) => (dispatch) =>
  axios
    .patch(`http://localhost:4000/post/${id}`, { id, name, author, goal })
    .then((res) =>
      dispatch({
        type: EDIT_ADDIC,
        id,
        name,
        author,
        goal,
      })
    );

export const getAddic = (id) => (dispatch) =>
  axios
    .get(`http://localhost:4000/post/${id}`, {
      id,
    })
    .then((res) =>
      dispatch({
        type: GET_ADDIC,
        id,
        payload: res.data,
      })
    );

export const deleteAddic = (id) => (dispatch) =>
  axios.delete(`http://localhost:4000/post/${id}`).then((res) =>
    dispatch({
      type: DELETE_ADDIC,
      id,
    })
  );

export const updateAddicLikes = (action, postId, likerId) => (dispatch) =>
  axios
    .patch(`http://localhost:4000/post/${postId}`, { action, id: likerId })
    .then((res) =>
      dispatch({
        type: UPDATE_ADDIC_LIKES,
        payload: res.data,
      })
    );

export const updateTimeStamp = (action, postId) => (dispatch) =>
  axios.patch(`http://localhost:4000/post/${postId}`, { action }).then((res) =>
    dispatch({
      type: UPDATE_TIMESTAMP,
      action,
      postId,
    })
  );

export const updateCardColor = (action, postId, cardColor) => (dispatch) =>
  axios.patch(`http://localhost:4000/post/${postId}`, { action }).then((res) =>
    dispatch({
      type: UPDATE_CARDCOLOR,
      payload: res.data,
    })
  );
