import React, { Component } from "react";
import { connect } from "react-redux";
import moment from "moment";
import PropTypes from "prop-types";

import compose from "recompose/compose";
import withStyles from "@material-ui/core/styles/withStyles";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";

import Grid from "@material-ui/core/Grid";
import Modal from "@material-ui/core/Modal";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import Loading from "../components/Loading";
import NavbarContainer from "./NavbarContainer";
import UserAvatar from "../components/UserAvatar";
import { updateCurrentUser } from "../actions/authActions";
import { getUser } from "../actions/userActions";
import AddicFeed from "./AddicFeed";
import { createAddic, getAddics } from "../actions/addicActions";

const styles = (theme) => ({
  rootContainer: {
    backgroundColor: "#F6F6F6",
    overflow: "hidden",
    position: "relative",
    height: "100%",
    minHeight: "100vh",
    paddingBottom: "10%",
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

  editButton: {
    margin: theme.spacing.unit,
    top: "20px",
    float: "left",
  },
  saveButton: {
    margin: theme.spacing.unit,
    backgroundColor: "#ff4d4d",
  },
  formContainer: {
    alignItems: "center",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  paper: {
    alignItems: "center",
    display: "flex",
    justifyContent: "center",
    width: "100%",
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
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  root: {
    flexGrow: 1,
    marginTop: "25px",
    justifyContent: "center",
    position: "relative",
  },

  addAddicButton: {
    float: "right",
  },
});

class ProfilePage extends Component {
  state = {
    avatarColor: 17,
    createdAt: 0,
    displayedAvatarColor: 17,
    displayedEmail: "",
    displayedName: "",
    email: "",
    loadingUser: true,
    modalOpeneditButton: false,
    modalOpenAddButton: false,
    name: "",
    profileId: "",
    addicName: "",
  };

  componentDidMount = () => {
    const { history } = this.props;
    if (!localStorage.jwtToken) {
      return history.push("/login");
    }

    const { retrieveUser, match } = this.props;
    const userId = match.params.id;

    return retrieveUser(userId).then((res) => {
      this.setState({
        createdAt: res.payload.user.createdAt,
        displayedEmail: res.payload.user.email,
        displayedName: res.payload.user.name,
        email: res.payload.user.email,
        loadingUser: false,
        name: res.payload.user.name,
        profileId: res.payload.user._id,
        pinned: res.payload.user.pind,
      });
    });
  };

  componentWillReceiveProps(newProps) {
    const { retrieveUser, match } = newProps;
    const userId = match.params.id;

    return retrieveUser(userId).then((res) => {
      this.setState({
        createdAt: res.payload.user.createdAt,
        displayedEmail: res.payload.user.email,
        displayedName: res.payload.user.name,
        email: res.payload.user.email,
        loadingUser: false,
        name: res.payload.user.name,
        profileId: res.payload.user._id,
        pinned: res.payload.user.pind,
      });
    });
  }

  handleModalOpenEditButton = () => {
    this.setState({ modalOpeneditButton: true });
  };

  handleModalCloseEditButton = () => {
    this.setState({ modalOpeneditButton: false });
  };

  handleModalOpenAddButton = () => {
    this.setState({ modalOpenAddButton: true });
  };

  handleModalCloseAddButton = () => {
    this.setState({ modalOpenAddButton: false });
  };

  handleChangeEdit = (e) => {
    const { name, value } = e.target;
    this.setState(() => ({ [name]: value }));
  };

  handleChangeAddic = (e) => {
    const addicName = e.target.value;
    this.setState(() => ({ addicName }));
  };

  handleSwitchChange = (e) => {
    const { value } = e.target;
    this.setState({
      [value]: e.target.checked,
    });
  };

  handleSubmitNewAddic = (e) => {
    const { addicName } = this.state;
    const { user, createAddic } = this.props;
    createAddic(addicName, user);
    this.setState({ addicName: "" });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { updateUser, signedInUser } = this.props;
    const { email, name } = this.state;

    updateUser(email, name, signedInUser.userId).then(() => {
      this.setState(
        {
          displayedEmail: email,
          displayedName: name,
        },
        () => {
          window.location.reload();
        }
      );
    });
  };

  handlePinnedAddic = (e) => {};

  render() {
    const { classes, getTheUser, match, signedInUser } = this.props;
    const {
      createdAt,
      displayedAvatarColor,
      displayedEmail,
      displayedName,
      loadingUser,
      modalOpeneditButton,
      modalOpenAddButton,
      profileId,
      //Use for pin feature pinned,
    } = this.state;

    return loadingUser ? (
      <div>
        <NavbarContainer />
        <Loading />
      </div>
    ) : (
      <div className={classes.rootContainer}>
        <NavbarContainer />
        <div className={classes.backgroundContainer}>
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
                  authorId={profileId}
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
                  className={classes.editButton}
                  onClick={this.handleModalOpenEditButton}
                  style={{
                    display:
                      profileId === signedInUser.userId ? "block" : "none",
                    backgroundColor: "#ff4d4d",
                    color: "white",
                  }}
                >
                  Edit Profile
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/*<Card
            style={{
              height: "100%",
              width: "45%",
              marginTop: "50px",
              marginLeft: "100px",
            }}
          >
            <PinnedAddic pinned={pinned} />
          </Card>*/}
        </div>
        <Grid
          container
          spacing={0}
          direction="row"
          alignItems="center"
          justify="center"
          style={{
            marginTop: "25px",
            margin: "55px auto",
            width: "90%",
          }}
        >
          <Grid
            item
            style={{
              width: "50%",
            }}
          >
            <Typography
              style={{
                float: "left",
                fontSize: "25px",
              }}
            >
              I have commit to quit:
            </Typography>
          </Grid>
          <Grid
            item
            style={{
              width: "50%",
            }}
          >
            <Button
              style={{
                display: profileId === signedInUser.userId ? "block" : "none",
                backgroundColor: "#ff4d4d",
                color: "white",
              }}
              variant="contained"
              className={classes.addAddicButton}
              onClick={this.handleModalOpenAddButton}
            >
              Add Addication
            </Button>
          </Grid>
        </Grid>
        <AddicFeed onProfilePage match={match} />
        <Modal
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          open={modalOpenAddButton}
          onClose={this.handleModalCloseAddButton}
        >
          <div className={classes.modalPaper}>
            <form
              className={classes.formContainer}
              autoComplete="off"
              onSubmit={this.handleSubmitNewAddic}
            >
              <Typography
                variant="title"
                id="modal-title"
                className={classes.spacing}
              >
                Add Addiction
              </Typography>
              <TextField
                required
                fullWidth
                className={classes.textField}
                id="addicName"
                label="Name of Addiction"
                margin="normal"
                addicName="addicName"
                onChange={this.handleChangeAddic}
                placeholder="Name of Addiction"
              />
              <Button
                fullWidth
                color="secondary"
                className={classes.saveButton}
                type="submit"
                variant="contained"
              >
                Add
              </Button>
            </form>
          </div>
        </Modal>

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
      </div>
    );
  }
}

ProfilePage.propTypes = {
  hasPinned: PropTypes.bool.isRequired,
  getAddics: PropTypes.func.isRequired,
  createAddic: PropTypes.func.isRequired,
  pinnedAddic: PropTypes.string.isRequired,
  user: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  getTheUser: PropTypes.func.isRequired,
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
  getAddics: () => dispatch(getAddics()),
  getTheUser: (id) => dispatch(getUser(id)),
  retrieveUser: (userId) => dispatch(getUser(userId)),
  updateUser: (email, name, id) => dispatch(updateCurrentUser(email, name, id)),
  createAddic: (addicName, user) => dispatch(createAddic(addicName, user)),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(ProfilePage);
