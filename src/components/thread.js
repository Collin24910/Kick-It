import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as moment from "moment";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import CommentIcon from "@material-ui/icons/Comment";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";

import ThreadComments from "./ThreadComment";
import EditThreadModel from "./EditThreadModel";
import UserAvatar from "./UserAvatar";

const options = ["Edit", "Delete"];

const ITEM_HEIGHT = 48;

const styles = (theme) => ({
  commentIcon: {
    textDecoration: "none",
    color: "grey",
    margin: "auto 5px auto auto",
  },

  topic: {
    fontSize: "20px",
    fontWeight: "bold",
    marginLeft: "55px",
    top: "50px",
  },
  text: {
    fontSize: "16px",
    marginLeft: "55px",
    marginTop: "10px",
  },
  link: {
    textDecoration: "none",
    fontSize: "20px",
    color: "black",
  },
  actions: {
    display: "flex",
  },
  card: {
    width: "100%",
  },
});

class thread extends Component {
  state = {
    anchorEl: null,
    expanded: false,
    modalOpen: false,
    timeStamp: "",
    authorname: "",
  };

  componentDidMount = () => {
    const { authorId, getUser, onThreadPage } = this.props;
    getUser(authorId).then((res) => {
      this.setState({
        authorname: res.payload.user.name,
      });
      if (onThreadPage) {
        this.setState({
          expanded: true,
        });
      }
    });
  };

  handleClick = (event) => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  handleExpandClick = () => {
    this.setState((state) => ({ expanded: !state.expanded }));
  };

  handleModalOpen = () => {
    this.setState({ modalOpen: true });
  };

  handleModalClose = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    const {
      _id,
      addComment,
      authorId,
      classes,
      comments,
      deleteComment,
      editComment,
      editPost,
      getUser,
      signedInUserId,
      text,
      topic,
      timestamp,
      deleteThread,
      onThreadPage,
    } = this.props;
    const { anchorEl, expanded, modalOpen, authorname } = this.state;
    const open = Boolean(anchorEl);
    const relativeTime = moment(timestamp).fromNow();

    return (
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{
          marginTop: "25px",
        }}
      >
        <Grid
          item
          xs={8}
          style={{
            width: "100%",
          }}
        >
          <div>
            <Card className={classes.card}>
              <CardHeader
                avatar={
                  <UserAvatar
                    author={authorname}
                    authorId={authorId}
                    getUser={getUser}
                  />
                }
                action={
                  authorId !== signedInUserId ? null : (
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
                                ? deleteThread(_id)
                                : null) ||
                              (option === "Edit"
                                ? this.handleModalOpen()
                                : null)
                            }
                          >
                            {option}
                          </MenuItem>
                        ))}
                      </Menu>
                    </div>
                  )
                }
                title={
                  <Link className={classes.link} to={`/profile/${authorId}`}>
                    {authorname}
                  </Link>
                }
                subheader={relativeTime}
              />
              <Link
                to={{
                  pathname: `/threadPage/${_id}`,
                }}
                style={{
                  textDecoration: "none",
                }}
              >
                <CardContent>
                  <Typography className={classes.topic}>{topic}</Typography>
                  <Typography className={classes.text}>{text}</Typography>
                </CardContent>
              </Link>
              <CardActions className={classes.actions} disableActionSpacing>
                <div style={{ marginLeft: "5px" }}>
                  {!onThreadPage ? (
                    <Link to={`/threadPage/${_id}`}>
                      <CommentIcon className={classes.commentIcon} />
                    </Link>
                  ) : (
                    <CommentIcon className={classes.commentIcon} />
                  )}
                  {comments.length}
                </div>
              </CardActions>
              <Collapse in={expanded} timeout="auto" unmountOnExit>
                <ThreadComments
                  addComment={addComment}
                  comments={comments}
                  commenterId={signedInUserId}
                  deleteComment={deleteComment}
                  editComment={editComment}
                  getUser={getUser}
                  threadId={_id}
                  signedInUserId={signedInUserId}
                />
              </Collapse>

              <EditThreadModel
                _id={_id}
                editPost={editPost}
                handleModalClose={this.handleModalClose}
                modalOpen={modalOpen}
                text={text}
                topic={topic}
              />
            </Card>
          </div>
        </Grid>
      </Grid>
    );
  }
}

thread.defaultProps = {
  comments: [],
};

thread.propTypes = {
  _id: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired,
  authorId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  comments: PropTypes.array,
  deleteComment: PropTypes.func.isRequired,
  deleteThread: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  editThread: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  signedInUserId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
};

export default withStyles(styles)(thread);
