import React, { Component } from "react";
import PropTypes from "prop-types";
import classnames from "classnames";
import * as moment from "moment";
import momentDurationFormatSetup from "moment-duration-format";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import { withStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import CommentIcon from "@material-ui/icons/Chat";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import LikeIcon from "@material-ui/icons/FavoriteBorder";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Grid from "@material-ui/core/Grid";

import Comments from "./Comment";
import EditAddicModal from "./EditAddicModal";

const options = ["Edit", "Delete", "Reset Timer"];

const ITEM_HEIGHT = 48;

const styles = (theme) => ({
  actions: {
    display: "flex",
  },
  card: {
    margin: "55px auto",
    width: "90%",
    backgroundColor: "white",
  },
  AddicName: {
    color: "#000",
    textDecoration: "none",
    fontSize: "25px",
    marginLeft: "20px",
  },
  expand: {
    transform: "rotate(0deg)",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
    marginLeft: "auto",
    [theme.breakpoints.up("sm")]: {
      marginRight: -8,
    },
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
});

class addic extends Component {
  intervalID;
  state = {
    anchorEl: null,
    avatarColor: 18,
    expanded: false,
    modalOpen: false,
    relativeTime: "",
    timeStamp: "",
    color: "",
    authorname: "",
    pinned: false,
    goalpercentage: "",
    mileStone: "",
  };

  componentDidMount = () => {
    this.intervalID = setInterval(this.calculateAbstenceTime, 1000);
    console.log(`mounted: ${this.props.name}`);
  };

  componentWillUnmount() {
    clearInterval(this.intervalID);
    console.log(`unmounted: ${this.props.name}`);
  }

  handleUpdateTimeStamp = () => {
    this.setState({ timeStamp: this.props.timestamp });
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

  calculateAbstenceTime = () => {
    momentDurationFormatSetup(moment);
    let now = moment(new Date());
    let end = this.props.timestamp;
    let durationInMilli = moment.duration(now.diff(end)).asMilliseconds();
    let duration = moment
      .duration(now.diff(end))
      .format("DD[d] HH[h] mm[m] ss[s]");

    this.setState({
      relativeTime: duration,
    });
    this.mileStone(durationInMilli);
    this.calculateGoalPercentage(durationInMilli);
  };

  calculateGoalPercentage = (duration) => {
    let goal = this.props.goal;
    let goalInMilli;
    switch (goal) {
      case "24 Hours":
        goalInMilli = 86400000;
        break;

      case "3 Days":
        goalInMilli = 259200000;
        break;

      case "10 Days":
        goalInMilli = 864000000;
        break;

      case "1 Week":
        goalInMilli = 604800000;
        break;

      case "2 Weeks":
        goalInMilli = 1209600000;
        break;

      case "1 Month":
        goalInMilli = 2628002880;
        break;

      case "3 Months":
        goalInMilli = 7884008640;
        break;

      case "6 Months":
        goalInMilli = 15768017280;
        break;

      case "1 Year":
        goalInMilli = 31536000000;
        break;

      case "5 Years":
        goalInMilli = 157680000000;
        break;

      default:
        goalInMilli = 86400000;
        break;
    }
    let ret = 100 * (duration / goalInMilli);
    ret = Math.round(ret * 10) / 10;
    if (ret > 100.0) {
      this.setState({
        goalpercentage: 100,
      });
    } else {
      this.setState({
        goalpercentage: ret.toFixed(1),
      });
    }
  };

  mileStone = (curDiration) => {
    let MileStone = "No mile stones reached yet";
    if (curDiration > 86400000) {
      MileStone = "24 Hours!";
    }
    if (curDiration > 259200000) {
      MileStone = "3 Days!";
    }
    if (curDiration > 604800000) {
      MileStone = "1 Week!";
    }
    if (curDiration > 1209600000) {
      MileStone = "2 Weeks!";
    }
    if (curDiration > 2628002880) {
      MileStone = "1 Month!";
    }
    if (curDiration > 15768017280) {
      MileStone = "6 Months!";
    }
    if (curDiration > 31536000000) {
      MileStone = "1 Year!";
    }
    this.setState({
      mileStone: MileStone,
    });
  };

  render() {
    const {
      _id,
      addComment,
      authorId,
      classes,
      comments,
      deleteComment,
      deleteAddic,
      editComment,
      editAddic,
      getUser,
      likers,
      likesCount,
      signedInUserId,
      name,
      updateAddicLikes,
      updateTimeStamp,
      isSignedinUser,
      //addpin,
      goal,
    } = this.props;
    const {
      anchorEl,
      expanded,
      modalOpen,
      authorname,
      relativeTime,
      goalpercentage,
      mileStone,
    } = this.state;
    const open = Boolean(anchorEl);
    return (
      <Card className={classes.card}>
        <CardHeader
          action={
            authorId !== signedInUserId ? null : (
              <div>
                {isSignedinUser ? (
                  <IconButton
                    aria-label="More"
                    aria-owns={open ? "long-menu" : null}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                  >
                    <MoreVertIcon />
                  </IconButton>
                ) : null}
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
                      onClick={
                        () =>
                          this.handleClose() ||
                          (option === "Delete" ? deleteAddic(_id) : null) ||
                          (option === "Edit" ? this.handleModalOpen() : null) ||
                          (option === "Reset Timer"
                            ? updateTimeStamp("updateTimer", _id)
                            : null) /*||
                        (option === "Pin" ? addpin(authorId, _id) : null) pinning feature not yet implemented*/
                      }
                    >
                      {option}
                    </MenuItem>
                  ))}
                </Menu>
              </div>
            )
          }
          title={<header className={classes.AddicName}>{name}</header>}
        />
        <CardContent
          style={{
            marginLeft: "15px",
          }}
        >
          <Grid
            container
            spaceing={2}
            direction="row"
            justifyContent="center"
            alignItems="center"
            style={{ justifyContent: "center", textAlign: "center" }}
          >
            <Grid
              item
              style={{
                width: "50%",
              }}
            >
              <Typography
                style={{
                  fontSize: "20px",
                }}
              >
                Abstinence Time:
              </Typography>
              <Typography
                style={{
                  fontSize: "25px",
                  fontWeight: "bold",
                }}
              >
                {relativeTime}
              </Typography>
              <hr
                style={{
                  width: "30%",
                }}
              ></hr>
              <Typography
                style={{
                  fontSize: "20px",
                }}
              >
                New Mile Stone:
              </Typography>
              <Typography
                style={{
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                {mileStone}
              </Typography>
            </Grid>
            <Grid
              item
              style={{
                width: "50%",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  position: "relative",
                  width: 180,
                  height: 180,
                  marginLeft: "auto",
                  marginRight: "auto",
                }}
              >
                <CircularProgressbar
                  value={goalpercentage}
                  text={`${goalpercentage}%`}
                  circleRatio="0.7"
                  styles={buildStyles({
                    pathColor: "#ff4d4d",
                    textColor: "#ff4d4d",
                    backgroundColor: "#3e98c7",
                    strokeLinecap: "butt",
                    rotation: 0.65,
                  })}
                />
                <Typography
                  style={{
                    fontSize: "22px",
                    bottom: "100px",
                  }}
                >
                  {goal}
                </Typography>
              </div>
            </Grid>
          </Grid>
        </CardContent>
        <CardActions className={classes.actions} disableActionSpacing>
          <div>
            <IconButton
              onClick={() =>
                likers.includes(signedInUserId)
                  ? updateAddicLikes("unlike", _id, signedInUserId)
                  : updateAddicLikes("like", _id, signedInUserId)
              }
              aria-label="Like"
            >
              <LikeIcon
                style={
                  likers.includes(signedInUserId) ? { color: "#3f51b5" } : null
                }
              />
            </IconButton>
            {likesCount}
          </div>
          <div style={{ marginLeft: "20px" }}>
            <IconButton onClick={this.handleExpandClick}>
              <CommentIcon />
            </IconButton>
            {comments.length}
          </div>
          <IconButton
            className={classnames(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={this.handleExpandClick}
            aria-expanded={expanded}
            aria-label="Show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Comments
            addComment={addComment}
            comments={comments}
            commenterId={signedInUserId}
            deleteComment={deleteComment}
            editComment={editComment}
            getUser={getUser}
            addicId={_id}
            signedInUserId={signedInUserId}
          />
        </Collapse>

        <EditAddicModal
          addicName={name}
          authorname={authorname}
          addicId={_id}
          editAddic={editAddic}
          handleModalClose={this.handleModalClose}
          modalOpen={modalOpen}
          text={name}
        />
      </Card>
    );
  }
}

addic.defaultProps = {
  comments: [],
};

addic.propTypes = {
  isSignedinUser: PropTypes.bool.isRequired,
  _id: PropTypes.string.isRequired,
  addComment: PropTypes.func.isRequired,
  authorId: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired,
  comments: PropTypes.array,
  deleteComment: PropTypes.func.isRequired,
  deleteAddic: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  editAddic: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  likers: PropTypes.array.isRequired,
  likesCount: PropTypes.number.isRequired,
  signedInUserId: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  timestamp: PropTypes.number.isRequired,
  updateAddicLikes: PropTypes.func.isRequired,
  updateTimeStamp: PropTypes.func.isRequired,
  addpin: PropTypes.func.isRequired,
};

export default withStyles(styles)(addic);
