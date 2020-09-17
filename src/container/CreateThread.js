import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import compose from "recompose/compose";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { createThread } from "../actions/threadActions";

const styles = (theme) => ({
  addThreadButton: {
    float: "left",
    margin: "40px 16.6%",
    width: "15%",
    backgroundColor: "#ff4d4d",
  },

  saveButton: {
    backgroundColor: "#ff4d4d",
    color: "white",
  },

  button: {
    margin: theme.spacing.unit,
  },
  container: {
    display: "flex",
    justifyContent: "center",
    marginTop: "16px",
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 500,
  },
  formContainer: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  modalPaper: {
    position: "absolute",
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    top: "50%",
    left: "50%",
    outline: "none",
    transform: "translate(-50%, -50%)",
  },
});

export class CreateThread extends Component {
  state = {
    threadText: "",
    threadTopic: "",
    modelOpen: false,
  };

  handleChangeTopic = (e) => {
    const threadTopic = e.target.value;
    this.setState(() => ({ threadTopic }));
  };

  handleChangeText = (e) => {
    const threadText = e.target.value;
    this.setState(() => ({ threadText }));
  };

  handleModalOpen = () => {
    this.setState({ modelOpen: true });
  };

  handleModalClose = () => {
    this.setState({ modelOpen: false });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { threadText, threadTopic } = this.state;
    const { user, createThread } = this.props;
    if (!threadText.trim()) return;
    createThread(threadTopic, threadText, user);
    this.setState({ threadText: "", threadTopic: "" });
    this.handleModalClose();
  };

  render() {
    const { modelOpen } = this.state;
    const { classes } = this.props;
    return (
      <div>
        <Button
          variant="contained"
          color="secondary"
          className={classes.addThreadButton}
          onClick={this.handleModalOpen}
        >
          Post
        </Button>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          open={modelOpen}
          onClose={this.handleModalClose}
        >
          <div className={classes.modalPaper}>
            <form
              className={classes.formContainer}
              autoComplete="off"
              onSubmit={this.handleSubmit}
            >
              <Typography
                variant="title"
                id="modal-title"
                className={classes.spacing}
              >
                Create Thread
              </Typography>
              <TextField
                required
                fullWidth
                className={classes.textField}
                id="topic"
                label="Topic"
                margin="normal"
                addicName="topic"
                onChange={this.handleChangeTopic}
                placeholder="Topic or Addiction you'd like to share"
              />
              <TextField
                required
                fullWidth
                className={classes.textField}
                id="text"
                label="Share your experience"
                margin="normal"
                addicName="text"
                onChange={this.handleChangeText}
                placeholder="Share your experience"
              />
              <Button
                fullWidth
                color="scondary"
                className={classes.saveButton}
                type="submit"
                variant="contained"
              >
                Post
              </Button>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

CreateThread.propTypes = {
  dispatch: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  createThread: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.authReducer.user,
});

const mapDispatchToProps = (dispatch) => ({
  createThread: (topic, text, user) =>
    dispatch(createThread(topic, text, user)),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(CreateThread);
