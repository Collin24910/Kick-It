import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as moment from "moment";

import { withStyles } from "@material-ui/core/styles";
import CardHeader from "@material-ui/core/CardHeader";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import EditAddicModal from "./EditAddicModal";

const options = ["Edit", "Delete"];
const ITEM_HEIGHT = 48;

const styles = (theme) => ({
  cardHeader: {
    borderLeft: "1px solid grey",
    marginLeft: "22px",
    marginBottom: "22px",
    marginTop: "22px",
  },
  commentContent: {},
  commentText: {
    fontWeight: "400",
  },
  commenter: {
    fontWeight: "400",
  },
  link: {
    color: "grey",
    textDecoration: "none",
  },
  timestamp: {
    fontWeight: "200",
    marginLeft: "10px",
    color: "grey",
  },
});

class ThreadCommentBody extends Component {
  state = {
    anchorEl: null,
    avatarColor: 18,
    modalOpen: false,
    name: "",
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

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleModalOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const {
      classes,
      commentId,
      commenterId,
      deleteComment,
      editComment,
      threadId,
      signedInUserId,
      timestamp,
      text,
    } = this.props;
    const { anchorEl, modalOpen, name } = this.state;
    const open = Boolean(anchorEl);

    return (
      <CardHeader
        avatar={<div></div>}
        title={
          <div className={classes.commentContent}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", flexDirection: "row" }}>
                <div className={classes.commenter}>
                  <Link className={classes.link} to={`/profile/${commenterId}`}>
                    {name}
                  </Link>
                </div>
                <div className={classes.timestamp}>
                  {moment(timestamp).fromNow()}
                </div>
              </div>
              <div>
                {commenterId !== signedInUserId ? null : (
                  <div>
                    <IconButton
                      aria-label="More"
                      aria-owns={open ? "long-menu" : null}
                      aria-haspopup="true"
                      onClick={this.handleClick}
                    >
                      <MoreVertIcon />
                    </IconButton>
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
                            (option === "Delete"
                              ? deleteComment(
                                  "deleteComment",
                                  commentId,
                                  threadId
                                )
                              : null) ||
                            (option === "Edit" ? this.handleModalOpen() : null)
                          }
                        >
                          {option}
                        </MenuItem>
                      ))}
                    </Menu>
                  </div>
                )}
              </div>
            </div>

            <div className={classes.commentText}>{text}</div>

            <EditAddicModal
              _id={commentId}
              isEditingComment
              commentPostId={threadId}
              editPost={editComment}
              handleModalClose={this.handleModalClose}
              modalOpen={modalOpen}
              text={text}
            />
          </div>
        }
        className={classes.cardHeader}
      />
    );
  }
}

ThreadCommentBody.propTypes = {
  classes: PropTypes.object.isRequired,
  commentId: PropTypes.string.isRequired,
  commenterId: PropTypes.string.isRequired,
  deleteComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  threadId: PropTypes.string.isRequired,
  signedInUserId: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  text: PropTypes.string.isRequired,
};

export default withStyles(styles)(ThreadCommentBody);
