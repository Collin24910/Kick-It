import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import compose from "recompose/compose";
import withStyles from "@material-ui/core/styles/withStyles";
import NavbarContainer from "./NavbarContainer";
import { getUser } from "../actions/userActions";
import {
  getThread,
  deleteThread,
  addComment,
  deleteComment,
  editComment,
} from "../actions/threadActions";
import ThreadFeed from "../container/ThreadFeed";

const styles = (theme) => ({
  rootContainer: {
    backgroundColor: "#F6F6F6",
    overflow: "hidden",
    position: "relative",
    height: "100%",
    minHeight: "100vh",
    paddingBottom: "10%",
  },
});

class ThreadPage extends Component {
  state = {
    topic: "",
    text: "",
    displayedName: "",
    email: "",
    loadingUser: true,
    name: "",
    threadId: "",
    comment: [],
    timestamp: "",
    authorname: "",
    anchorEl: null,
    expanded: false,
    modalOpen: false,
    signedInUserId: "",
    onThreadPage: true,
  };

  componentDidMount = () => {
    const { match } = this.props;
    const ThreadId = match.params.id;
    this.setState({
      threadId: ThreadId,
      loadingUser: false,
    });
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleExpandClick = () => {
    this.setState((state) => ({ expanded: !state.expanded }));
  };

  render() {
    const { classes } = this.props;
    const { threadId, onThreadPage } = this.state;
    return (
      <div className={classes.rootContainer}>
        <NavbarContainer />
        <ThreadFeed onThreadPage={onThreadPage} threadId={threadId} />
      </div>
    );
  }
}

ThreadPage.propTypes = {
  addComment: PropTypes.func.isRequired,
  getThread: PropTypes.func.isRequired,
  authorId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  comments: PropTypes.array,
  deleteComment: PropTypes.func.isRequired,
  deleteThread: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  editThread: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  signedInUserId: PropTypes.string.isRequired,
  topic: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
};

const mapStateToProps = (state) => ({
  signedInUser: state.authReducer.user,
  user: state.authReducer.user,
});

const mapDispatchToProps = (dispatch) => ({
  getThread: (id) => dispatch(getThread(id)),
  getThedeleteThread: (id) => dispatch(deleteThread(id)),
  retrieveUser: (userId) => dispatch(getUser(userId)),
  addComment: (action, commenterId, threadId, text, timestamp) =>
    dispatch(addComment(action, commenterId, threadId, text, timestamp)),
  deleteComment: (action, commentId, id) =>
    dispatch(deleteComment(action, commentId, id)),
  editComment: (action, commentId, threadId, text) =>
    dispatch(editComment(action, commentId, threadId, text)),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(ThreadPage);
