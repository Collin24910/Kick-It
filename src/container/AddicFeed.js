import { connect } from "react-redux";
import addicList from "../components/addicList";
import {
  addComment,
  deleteComment,
  editComment,
  deleteAddic,
  getAddics,
  editAddic,
  updateAddicLikes,
  updateTimeStamp,
  updateCardColor,
} from "../actions/addicActions";
import { getUser, addpin } from "../actions/userActions";

const mapStateToProps = (state) => ({
  adds: state.addicReducer.adds,
  user: state.authReducer.user,
});

const mapDispatchToProps = (dispatch) => ({
  addComment: (action, commenterId, addId, name, timestamp) =>
    dispatch(addComment(action, commenterId, addId, name, timestamp)),
  deleteComment: (action, commentId, addId) =>
    dispatch(deleteComment(action, commentId, addId)),
  editComment: (action, commentId, addId, name) =>
    dispatch(editComment(action, commentId, addId, name)),
  deleteAddic: (id) => dispatch(deleteAddic(id)),
  getAddics: () => dispatch(getAddics()),
  getUser: (id) => dispatch(getUser(id)),
  editAddic: (id, name, author) => dispatch(editAddic(id, name, author)),
  updateAddicLikes: (action, addId, likerId) =>
    dispatch(updateAddicLikes(action, addId, likerId)),
  updateTimeStamp: (action, addId) => dispatch(updateTimeStamp(action, addId)),
  addpin: (id, addId) => dispatch(addpin(id, addId)),
  updateCardColor: (action, addId, color) =>
    dispatch(updateCardColor(action, addId, color)),
});

export default connect(mapStateToProps, mapDispatchToProps)(addicList);
