import React, { Component } from "react";
import PropTypes from "prop-types";
import Addic from "./addic";
import Loading from "./Loading";

class AddicList extends Component {
  state = {
    loading: true,
    isSignedin: false,
  };

  componentDidMount = () => {
    const { getAddics, user, onProfilePage } = this.props;
    getAddics().then(() => {
      this.setState({
        loading: false,
      });
    });
    this.checkSignedin(onProfilePage, user.userId);
  };

  checkSignedin = (onProfilePage, signedInUserId) => {
    if (onProfilePage) {
      const { match } = this.props;
      const userProfileId = match.params.id;
      if (userProfileId === signedInUserId) {
        this.setState({
          isSignedin: true,
        });
      }
    }
  };

  // If on user X's profile page, only show posts made by user X
  // Otherwise, show posts made by user X and their followers
  checkPageType = (onProfilePage, postAuthorId, signedInUserId) => {
    if (onProfilePage) {
      const { match } = this.props;
      const userProfileId = match.params.id;
      return postAuthorId === userProfileId;
    }
  };

  render() {
    const {
      addComment,
      deleteComment,
      deleteAddic,
      editComment,
      editAddic,
      getUser,
      adds,
      updateAddicLikes,
      updateTimeStamp,
      user,
      onProfilePage,
      updateCardColor,
      addpin,
    } = this.props;
    const { loading } = this.state;

    return loading ? (
      <Loading />
    ) : (
      <div>
        {adds.map((add) =>
          this.checkPageType(onProfilePage, add.authorId, user.userId) ? (
            <Addic
              isSignedinUser={this.state.isSignedin}
              key={add._id}
              _id={add._id}
              authorId={add.authorId}
              comments={add.comments}
              likers={add.likers}
              likesCount={add.likesCount}
              signedInUserId={user.userId}
              name={add.name}
              timestamp={add.timestamp}
              pinned={add.pinned}
              goal={add.goal}
              cardColor={add.cardColor}
              addComment={(action, commenterId, addId, text, timestamp) =>
                addComment(action, commenterId, addId, text, timestamp)
              }
              deleteComment={(action, commentId, addId) =>
                deleteComment(action, commentId, addId)
              }
              deleteAddic={(id) => deleteAddic(id)}
              editComment={(action, commentId, addId, text) =>
                editComment(action, commentId, addId, text)
              }
              editAddic={(id, name, author) => editAddic(id, name, author)}
              getUser={(id) => getUser(id)}
              updateAddicLikes={(action, addId, likerId) =>
                updateAddicLikes(action, addId, likerId)
              }
              updateTimeStamp={(action, addId) =>
                updateTimeStamp(action, addId)
              }
              addpin={(authorId, addicId) => addpin(authorId, addicId)}
              updateCardColor={(action, addicId, color) =>
                updateCardColor(action, addicId, color)
              }
            />
          ) : null
        )}
      </div>
    );
  }
}

AddicList.defaultProps = {
  adds: [
    {
      comments: [],
    },
  ],
  match: {
    params: {
      id: "",
    },
  },
  onProfilePage: false,

  pinnedAdd: "",
};

AddicList.propTypes = {
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  deleteAddic: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  editAddic: PropTypes.func.isRequired,
  getAddics: PropTypes.func.isRequired,
  updateTimeStamp: PropTypes.func.isRequired,
  addpin: PropTypes.func.isRequired,
  updateCardColor: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  isSignedinUser: PropTypes.bool,
  onProfilePage: PropTypes.bool,
  pinnedAdd: PropTypes.string,
  adds: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      authorId: PropTypes.string.isRequired,
      comments: PropTypes.array,
      likers: PropTypes.array.isRequired,
      likesCount: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      pinned: PropTypes.bool.isRequired,
      goal: PropTypes.string.isRequired,
      cardColor: PropTypes.string.isRequired,
    })
  ),
  updateAddicLikes: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    userId: PropTypes.string.isRequired,
  }).isRequired,
};

export default AddicList;
