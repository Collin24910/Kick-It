import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import compose from "recompose/compose";
import classNames from "classnames";
import Grid from "@material-ui/core/Grid";
import { withStyles } from "@material-ui/core/styles";
import { getUser, getAllUsers } from "../actions/userActions";
import NavbarContainer from "./NavbarContainer";
import Loading from "../components/Loading";
import UserCard from "../components/UserCard";

const styles = (theme) => ({
  cardGrid: {
    padding: `${theme.spacing.unit * 4}px 0`,
  },
  layout: {
    width: "auto",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
    },
  },
});

export class DiscoverPage extends Component {
  state = {
    loading: true,
    following: [],
  };

  componentDidMount = () => {
    const { retrieveAllUsers } = this.props;

    retrieveAllUsers().then(() => {
      this.setState({
        loading: false,
      });
    });
  };

  // Set "following" to be the list of users you are following

  render() {
    const { authReducer, classes, getCurrUser, userReducer } = this.props;
    const { loading } = this.state;

    return loading ? (
      <div>
        <NavbarContainer />
        <Loading />
      </div>
    ) : (
      <div>
        <NavbarContainer />
        <main>
          <div className={classNames(classes.layout, classes.cardGrid)}>
            <Grid container justify="center" spacing={40}>
              {userReducer.allUsers.map((user) =>
                user._id === authReducer.user.userId ? null : (
                  <Grid item key={user._id} sm={6} md={3} lg={2}>
                    <UserCard
                      getUser={getCurrUser}
                      listedUser={user}
                      signedInUser={authReducer.user}
                    />
                  </Grid>
                )
              )}
            </Grid>
          </div>
        </main>
      </div>
    );
  }
}

DiscoverPage.propTypes = {
  authReducer: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  followThisUser: PropTypes.func.isRequired,
  getCurrUser: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  retrieveAllUsers: PropTypes.func.isRequired,
  unfollowThisUser: PropTypes.func.isRequired,
  userReducer: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  authReducer: state.authReducer,
  userReducer: state.userReducer,
});

const mapDispatchToProps = (dispatch) => ({
  getCurrUser: (id) => dispatch(getUser(id)),
  retrieveAllUsers: () => dispatch(getAllUsers()),
});

export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(DiscoverPage);
