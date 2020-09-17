import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import compose from "recompose/compose";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { editComment, editThread } from "../actions/threadActions";

const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit,
  },
  container: {
    display: "flex",
    justifyContent: "center",
  },
  nameField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500,
  },
});

export class EditThread extends Component {
  /* eslint-disable react/destructuring-assignment */
  state = {
    topic: this.props.topic,
    text: this.props.text,
  };
  /* eslint-enable react/destructuring-assignment */

  handleChangeText = (e) => {
    const text = e.target.value;
    this.setState(() => ({ text }));
  };
  handleChangeTopic = (e) => {
    const topic = e.target.value;
    this.setState(() => ({ topic }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { text, topic } = this.state;
    const {
      commentPostId,
      id,
      isEditingComment,
      author,
      editThread,
      handleModalClose,
      editComment,
    } = this.props;
    if (!text.trim()) return;

    if (isEditingComment) {
      editComment("editComment", id, commentPostId, text);
    } else {
      editThread(id, text, topic, author);
    }

    handleModalClose();
  };

  render() {
    const { text, topic } = this.state;
    const { classes, isEditingComment } = this.props;
    return (
      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        {isEditingComment ? (
          <TextField
            id="textarea"
            placeholder="Edit this comment"
            multiline
            className={classes.nameField}
            margin="normal"
            rowsMax="5"
            value={text}
            onChange={this.handleChangeText}
          />
        ) : (
          <div>
            <TextField
              id="textarea"
              placeholder="Edit the topic"
              multiline
              className={classes.nameField}
              margin="normal"
              rowsMax="5"
              value={topic}
              onChange={this.handleChangeTopic}
            />
            <TextField
              id="textarea"
              placeholder="Edit the text"
              multiline
              className={classes.nameField}
              margin="normal"
              rowsMax="5"
              value={text}
              onChange={this.handleChangeText}
            />
          </div>
        )}
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          type="submit"
        >
          Update
        </Button>
      </form>
    );
  }
}

EditThread.propTypes = {
  classes: PropTypes.object.isRequired,
  commentPostId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isEditingComment: PropTypes.bool.isRequired,
  author: PropTypes.string.isRequired,
  editAddic: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  handleModalClose: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  editComment: (action, id, commentId, text) =>
    dispatch(editComment(action, id, commentId, text)),
  editThread: (id, addicName, author) =>
    dispatch(editThread(id, addicName, author)),
});

export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(EditThread);
