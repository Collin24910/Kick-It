import React, { Component } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";

import CreateThread from "./CreateThread";
import NavbarContainer from "./NavbarContainer";
import ThreadFeed from "./ThreadFeed";

export class HomePage extends Component {
  state = {
    onThreadPage: false,
  };
  componentDidMount = () => {
    const { history } = this.props;
    if (!localStorage.jwtToken) {
      history.push("/login");
    }
  };

  render() {
    const { onThreadPage } = this.state;
    return (
      <div
        style={{
          backgroundColor: "#F6F6F6",
          overflow: "hidden",
          position: "relative",
          height: "100%",
          minHeight: "100vh",
          paddingBottom: "10%",
        }}
      >
        <NavbarContainer />
        <CreateThread />
        <ThreadFeed onThreadPage={onThreadPage} />
      </div>
    );
  }
}

HomePage.propTypes = {
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.authReducer,
});

export default connect(mapStateToProps)(HomePage);
