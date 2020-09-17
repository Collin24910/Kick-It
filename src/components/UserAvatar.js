import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

import Avatar from "@material-ui/core/Avatar";
import lightBlue from "@material-ui/core/colors/lightBlue";

class UserAvatar extends Component {
  state = {
    avatarColor: 18,
    name: "",
  };

  componentDidMount = () => {
    const { authorId, getUser } = this.props;
    getUser(authorId).then((res) => {
      this.setState({
        name: res.payload.user.name,
      });
    });
  };

  render() {
    const { authorId } = this.props;
    const { name } = this.state;

    const color = lightBlue;
    return (
      <Link style={{ textDecoration: "none" }} to={`/profile/${authorId}`}>
        <Avatar
          aria-label="Initials"
          style={{
            backgroundColor: color,
            width: "50px",
            height: "50px",
          }}
        >
          {name.charAt(0).toUpperCase()}
        </Avatar>
      </Link>
    );
  }
}

UserAvatar.propTypes = {
  authorId: PropTypes.string.isRequired,
  getUser: PropTypes.func.isRequired,
};

export default UserAvatar;
