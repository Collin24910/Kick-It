import { connect } from "react-redux";
import threadList from "../components/threadList";
import {
  addComment,
  deleteComment,
  editComment,
  deleteThread,
  getThreads,
  editThread,
} from "../actions/threadActions";
import { getUser } from "../actions/userActions";

const mapStateToProps = (state) => ({
  threads: state.threadReducer.threads,
  user: state.authReducer.user,
});

const mapDispatchToProps = (dispatch) => ({
  addComment: (action, commenterId, threadId, name, timestamp) =>
    dispatch(addComment(action, commenterId, threadId, name, timestamp)),
  deleteComment: (action, commentId, threadId) =>
    dispatch(deleteComment(action, commentId, threadId)),
  editComment: (action, commentId, threadId, name) =>
    dispatch(editComment(action, commentId, threadId, name)),
  deleteThread: (id) => dispatch(deleteThread(id)),
  getThreads: () => dispatch(getThreads()),
  getUser: (id) => dispatch(getUser(id)),
  editThread: (id, name, author) => dispatch(editThread(id, name, author)),
});

export default connect(mapStateToProps, mapDispatchToProps)(threadList);
