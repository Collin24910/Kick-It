import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Modal from "@material-ui/core/Modal";

import EditThread from "../container/EditThread";

const styles = (theme) => ({
  paper: {
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
  spacing: {
    marginBottom: "10px",
  },
});

class EditThreadModal extends Component {
  state = {
    topic: "",
    text: "",
  };

  render() {
    const {
      _id,
      isEditingComment,
      classes,
      commentPostId,
      editThread,
      handleModalClose,
      modalOpen,
      topic,
      editComment,
    } = this.props;
    const { name, text } = this.state;

    return (
      <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
        open={modalOpen}
        onClose={handleModalClose}
      >
        <div className={classes.paper}>
          <Typography
            variant="title"
            id="modal-title"
            className={classes.spacing}
          >
            {isEditingComment ? "Edit this comment" : "Edit this post"}
          </Typography>
          <Typography variant="subheading" id="modal-description">
            <EditThread
              author={name}
              text={text}
              commentPostId={commentPostId}
              editThread={editThread}
              editComment={editComment}
              handleModalClose={handleModalClose}
              id={_id}
              isEditingComment={isEditingComment}
              topic={topic}
            />
          </Typography>
        </div>
      </Modal>
    );
  }
}

EditThreadModal.defaultProps = {
  commentPostId: "",
  isEditingComment: false,
};

EditThreadModal.propTypes = {
  _id: PropTypes.string.isRequired,
  isEditingComment: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  commentPostId: PropTypes.string,
  editAddic: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  handleModalClose: PropTypes.func.isRequired,
  modalOpen: PropTypes.bool.isRequired,
};

export default withStyles(styles)(EditThreadModal);
