import React from "react";
import PropTypes from "prop-types";

import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import PeopleIcon from "@material-ui/icons/People";
import HomeOutlinedIcon from "@material-ui/icons/HomeOutlined";
import SettingsIcon from "@material-ui/icons/Settings";

import { Link } from "react-router-dom";

export const FolderListItems = ({ user }) => (
  <div>
    <Link style={{ textDecoration: "none" }} to="/">
      <ListItem button>
        <ListItemIcon>
          <HomeOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </Link>
    <Link style={{ textDecoration: "none" }} to={`/profile/${user.userId}`}>
      <ListItem button>
        <ListItemIcon>
          <AccountCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Profile" />
      </ListItem>
    </Link>
    <Link style={{ textDecoration: "none" }} to="/Users">
      <ListItem button>
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Discover" />
      </ListItem>
    </Link>
  </div>
);

export const OtherFolderListItems = (
  <div>
    <Link style={{ textDecoration: "none" }} to="/settings">
      <ListItem button>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
    </Link>
  </div>
);

FolderListItems.propTypes = {
  user: PropTypes.object.isRequired,
};
