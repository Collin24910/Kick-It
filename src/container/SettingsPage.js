import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import moment from "moment";

import compose from "recompose/compose";
import Loading from "../components/Loading";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import UserAvatar from "../components/UserAvatar";
import { getUser } from "../actions/userActions";
import {
  updateCurrentUser,
  deleteUser,
  logoutUser,
} from "../actions/authActions";
import NavbarContainer from "./NavbarContainer";

const styles = (theme) => ({
  rootContainer: {
    backgroundColor: "#F6F6F6",
    overflow: "hidden",
    position: "relative",
    height: "100%",
    minHeight: "100vh",
  },
  backgroundContainer: {
    alignItems: "center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    display: "flex",
    height: "50vh",
    position: "relative",
    width: "100%",
  },
  date: {
    fontSize: "25px",
    marginLeft: "10px",
  },

  Button: {
    margin: theme.spacing.unit,
    top: "20px",
    float: "left",
  },
  saveButton: {
    margin: theme.spacing.unit,
  },
  formContainer: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  card: {
    width: "100%",
  },
  paper: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    width: "100%",
    marginTop: "20px",
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
class SettingsPage extends Component {
  state = {
    avatarColor: 17,
    createdAt: 0,
    displayedAvatarColor: 17,
    email: "",
    loadingUser: true,
    modalOpeneditButton: false,
    warningModalButton: false,
    displayedEmail: "",
    displayedName: "",
    name: "",
  };

  componentDidMount = () => {
    const { history } = this.props;
    if (!localStorage.jwtToken) {
      return history.push("/login");
    }
    this.setState({
      createdAt: this.props.user.createdAt,
      email: this.props.user.email,
      loadingUser: false,
      name: this.props.user.name,
      displayedEmail: this.props.user.email,
      displayedName: this.props.user.name,
      userId: this.props.user.userId,
    });
  };

  handleModalOpenEditButton = () => {
    this.setState({ modalOpeneditButton: true });
  };

  handleModalCloseEditButton = () => {
    this.setState({ modalOpeneditButton: false });
  };

  handleModalOpenWarningButton = () => {
    this.setState({ warningModalButton: true });
  };

  handleModalCloseWarningButton = () => {
    this.setState({ warningModalButton: false });
  };

  deleteFunc = () => {
    const { deleteAccount } = this.props;
    const { userId } = this.state;
    deleteAccount(userId);
  };

  render() {
    const { classes, logout, signedInUser, getTheUser } = this.props;
    const {
      createdAt,
      displayedAvatarColor,
      displayedEmail,
      displayedName,
      userId,
      modalOpeneditButton,
      loadingUser,
      warningModalButton,
    } = this.state;
    return loadingUser ? (
      <div>
        <NavbarContainer />
        <Loading />
      </div>
    ) : (
      <div className={classes.rootContainer}>
        <NavbarContainer />
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justify="center"
        >
          <Card
            style={{
              marginTop: "50px",
              height: "100%",
              width: "50%",
            }}
          >
            <CardContent
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <UserAvatar
                author={displayedName}
                authorId={userId}
                avatarColor={displayedAvatarColor}
                getUser={getTheUser}
              />
              <Typography variant="headline" style={{ marginTop: "10px" }}>
                {displayedName}
              </Typography>
              <Typography>{displayedEmail}</Typography>
              <Grid
                container
                spacing={0}
                direction="row"
                alignItems="center"
                justify="center"
                className={classes.root}
              >
                <Grid item xs={5}>
                  <Paper className={classes.paper}>
                    <Typography
                      variant="headline"
                      style={{
                        fontSize: "25px",
                      }}
                    >
                      Joined:
                    </Typography>
                    <Typography variant="display1" className={classes.date}>
                      {moment(createdAt).format("l")}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
              <Button
                variant="contained"
                className={classes.Button}
                onClick={this.handleModalOpenEditButton}
                style={{
                  display: userId === signedInUser.userId ? "block" : "none",
                  backgroundColor: "#ff4d4d",
                  color: "white",
                }}
              >
                Edit Profile
              </Button>
              <Button
                className={classes.Button}
                variant="contained"
                color="secondary"
                onClick={logout}
                style={{ backgroundColor: "#ff4d4d" }}
              >
                Log Out
              </Button>
              <Button
                className={classes.Button}
                variant="contained"
                color="secondary"
                onClick={this.handleModalOpenWarningButton}
                style={{ backgroundColor: "#ff4d4d" }}
              >
                Delete Account
              </Button>
            </CardContent>
          </Card>
        </Grid>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          open={modalOpeneditButton}
          onClose={this.handleModalCloseEditButton}
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
                Edit Profile
              </Typography>
              <TextField
                required
                fullWidth
                className={classes.textField}
                defaultValue={signedInUser.name}
                id="name"
                label="Name"
                margin="normal"
                name="name"
                onChange={this.handleChangeEdit}
                placeholder="What is your name?"
              />
              <Button
                fullWidth
                color="primary"
                className={classes.saveButton}
                type="submit"
                variant="contained"
              >
                Save
              </Button>
            </form>
          </div>
        </Modal>
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          open={warningModalButton}
          onClose={this.handleModalCloseWarningButton}
        >
          <div className={classes.modalPaper}>
            <form className={classes.formContainer} autoComplete="off">
              <Typography
                variant="title"
                id="modal-title"
                className={classes.spacing}
              >
                Are you sure you would like to delete this account?
              </Typography>
              <Button onClick={this.deleteFunc}>Yes</Button>
              <Button onClick={this.handleModalCloseWarningButton}>No</Button>
            </form>
          </div>
        </Modal>
      </div>
    );
  }
}

SettingsPage.propTypes = {
  classes: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  user: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  updateUser: PropTypes.func.isRequired,
  signedInUser: PropTypes.shape({
    createdAt: PropTypes.number.isRequired,
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
  }).isRequired,
  retrieveUser: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  signedInUser: state.authReducer.user,
  user: state.authReducer.user,
});

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logoutUser()),
  getTheUser: (id) => dispatch(getUser(id)),
  updateUser: (email, name, id) => dispatch(updateCurrentUser(email, name, id)),
  deleteAccount: (id) => dispatch(deleteUser(id)),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(SettingsPage);
