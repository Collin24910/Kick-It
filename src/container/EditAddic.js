import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import compose from "recompose/compose";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { withStyles } from "@material-ui/core/styles";
import { editComment, editAddic } from "../actions/addicActions";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const options = [
  "24 Hours",
  "3 Days",
  "1 Week",
  "10 Days",
  "2 Weeks",
  "1 Month",
  "3 Months",
  "6 Months",
  "1 Year",
  "5 Years",
];
const ITEM_HEIGHT = 48;

const styles = (theme) => ({
  button: {
    margin: theme.spacing.unit,
    backgroundColor: "#ff4d4d",
  },
  container: {
    display: "flex",
    justifyContent: "center",
  },
  nameField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
  },
  goalButton: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 400,
  },
});

export class EditAddic extends Component {
  state = {
    text: this.props.text,
    goal: "",
  };

  handleChange = (e) => {
    const text = e.target.value;
    this.setState(() => ({ text }));
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { text, goal } = this.state;
    const {
      commentPostId,
      id,
      isEditingComment,
      author,
      editAddic,
      handleModalClose,
      editComment,
    } = this.props;

    if (isEditingComment) {
      editComment("editComment", id, commentPostId, text);
    } else {
      if (text === "") {
        let name = this.props.addicName;
        editAddic(id, name, author, goal);
      } else {
        editAddic(id, text, author, goal);
      }
    }

    handleModalClose();
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  setGoal = (Goal) => {
    this.setState({
      goal: Goal,
    });
  };

  render() {
    const { text, anchorEl, goal } = this.state;
    const { classes, isEditingComment } = this.props;
    const open = Boolean(anchorEl);
    return (
      <form
        className={classes.container}
        noValidate
        autoComplete="off"
        onSubmit={this.handleSubmit}
      >
        {isEditingComment ? (
          <div>
            <TextField
              id="textarea"
              placeholder={"Edit this comment"}
              multiline
              className={classes.nameField}
              margin="normal"
              rowsMax="5"
              value={text}
              onChange={this.handleChange}
              required="false"
            />
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              type="submit"
            >
              Update
            </Button>
          </div>
        ) : (
          <div>
            <TextField
              id="textarea"
              placeholder={"Edit name"}
              multiline
              className={classes.nameField}
              margin="normal"
              rowsMax="5"
              value={text}
              onChange={this.handleChange}
              required="false"
            />
            <Button
              className={classes.goalButton}
              ref={anchorEl}
              aria-label="More"
              aria-controls={open ? "menu-list-grow" : null}
              aria-haspopup="true"
              onClick={this.handleClick}
            >
              {goal === "" ? "Set Goal" : goal}
            </Button>
            <Menu
              id="long-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={this.handleClose}
              PaperProps={{
                style: {
                  maxHeight: ITEM_HEIGHT * 4.5,
                  width: 200,
                },
              }}
            >
              {options.map((option) => (
                <MenuItem
                  key={option}
                  onClick={() =>
                    this.handleClose() ||
                    (option === "24 Hours" ? this.setGoal("24 Hours") : null) ||
                    (option === "3 Days" ? this.setGoal("3 Days") : null) ||
                    (option === "1 Week" ? this.setGoal("1 Week") : null) ||
                    (option === "10 Days" ? this.setGoal("10 Days") : null) ||
                    (option === "2 Weeks" ? this.setGoal("2 Weeks") : null) ||
                    (option === "1 Month" ? this.setGoal("1 Month") : null) ||
                    (option === "3 Months" ? this.setGoal("3 Months") : null) ||
                    (option === "6 Months" ? this.setGoal("6 Months") : null) ||
                    (option === "1 Year" ? this.setGoal("1 Year") : null) ||
                    (option === "5 Years" ? this.setGoal("5 Years") : null)
                  }
                >
                  {option}
                </MenuItem>
              ))}
            </Menu>
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              type="submit"
            >
              Update
            </Button>
          </div>
        )}
      </form>
    );
  }
}

EditAddic.propTypes = {
  classes: PropTypes.object.isRequired,
  commentPostId: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  isEditingComment: PropTypes.bool.isRequired,
  author: PropTypes.string.isRequired,
  editAddic: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  handleModalClose: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  goal: PropTypes.string.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  editComment: (action, id, commentId, text) =>
    dispatch(editComment(action, id, commentId, text)),
  editAddic: (id, addicName, author, goal) =>
    dispatch(editAddic(id, addicName, author, goal)),
});

export default compose(
  withStyles(styles),
  connect(null, mapDispatchToProps)
)(EditAddic);
