import React, { Component } from "react";
import PropTypes from "prop-types";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CardHeader from "@material-ui/core/CardHeader";
import SendIcon from "@material-ui/icons/Send";
import TextField from "@material-ui/core/TextField";

const styles = (theme) => ({
  button: {
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit,
    backgroundColor: "#ff4d4d",
  },
  cardHeader: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
  },
  cardHeaderTitle: {
    display: "flex",
  },
  commentField: {
    width: "90%",
    marginLeft: theme.spacing.unit,
    marginTop: theme.spacing.unit,
  },
});

class ThreadCommentField extends Component {
  state = {
    avatarColor: 18,
    name: "",
    text: "",
  };

  componentDidMount = () => {
    const { commenterId, getUser } = this.props;
    getUser(commenterId).then((res) => {
      this.setState({
        avatarColor: res.payload.user.avatarColor,
        name: res.payload.user.name,
      });
    });
  };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState(() => ({ text: value }));
  };

  postComment = (e) => {
    e.preventDefault();
    const { addComment, commenterId, threadId } = this.props;
    const { text } = this.state;
    const timestamp = new Date().getTime();

    if (text.trim() === "") return;

    addComment("addComment", commenterId, threadId, text, timestamp);
    this.setState({
      text: "",
    });
  };

  render() {
    const { classes } = this.props;
    const { text } = this.state;

    return (
      <CardHeader
        className={classes.cardHeader}
        title={
          <div className={classes.cardHeaderTitle}>
            <TextField
              multiline
              placeholder="Write a comment"
              className={classes.commentField}
              onChange={this.handleChange}
              value={text}
            />
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={this.postComment}
            >
              <SendIcon />
            </Button>
          </div>
        }
      />
    );
  }
}

ThreadCommentField.propTypes = {
  addComment: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  commenterId: PropTypes.string.isRequired,
  getUser: PropTypes.func.isRequired,
  threadId: PropTypes.string.isRequired,
};

export default withStyles(styles)(ThreadCommentField);
