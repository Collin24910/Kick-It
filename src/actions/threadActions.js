import axios from "axios";
import {
  ADD_COMMENT_THREAD,
  DELETE_COMMENT_THREAD,
  EDIT_COMMENT_THREAD,
  GET_THREADS,
  CREATE_THREAD,
  EDIT_THREAD,
  DELETE_THREAD,
  GET_THREAD,
} from "./actionType";

export const createThread = (topic, text, user) => (dispatch) =>
  axios
    .post("http://localhost:4000/thread/", {
      authorId: user.userId,
      topic,
      text,
    })
    .then((res) =>
      dispatch({
        type: CREATE_THREAD,
        payload: res.data,
      })
    );

export const getThreads = () => (dispatch) =>
  axios.get("http://localhost:4000/thread/").then((res) =>
    dispatch({
      type: GET_THREADS,
      payload: res.data,
    })
  );

export const getThread = (id) => (dispatch) =>
  axios.get(`http://localhost:4000/thread/${id}`, { id }).then((res) =>
    dispatch({
      type: GET_THREAD,
      payload: res.data,
    })
  );

export const editThread = (id, text, topic, author) => (dispatch) =>
  axios
    .patch(`http://localhost:4000/thread/${id}`, { id, text, topic, author })
    .then((res) =>
      dispatch({
        type: EDIT_THREAD,
        id,
        text,
        author,
        topic,
      })
    );

export const addComment = (action, commenterId, threadId, text, timestamp) => (
  dispatch
) =>
  axios
    .patch(`http://localhost:4000/thread/${threadId}`, {
      action,
      commenterId,
      text,
      timestamp,
    })
    .then((res) =>
      dispatch({
        type: ADD_COMMENT_THREAD,
        payload: res.data,
        commenterId,
        text,
        timestamp,
      })
    );

export const deleteComment = (action, commentId, threadId) => (dispatch) =>
  axios
    .patch(`http://localhost:4000/thread/${threadId}`, { action, commentId })
    .then((res) =>
      dispatch({
        type: DELETE_COMMENT_THREAD,
        payload: res.data,
      })
    );

export const editComment = (action, commentId, threadId, text) => (dispatch) =>
  axios
    .patch(`http://localhost:4000/thread/${threadId}`, {
      action,
      commentId,
      text,
    })
    .then((res) =>
      dispatch({
        type: EDIT_COMMENT_THREAD,
        payload: res.data,
      })
    );

export const deleteThread = (id) => (dispatch) =>
  axios.delete(`http://localhost:4000/thread/${id}`).then((res) =>
    dispatch({
      type: DELETE_THREAD,
      id,
    })
  );
