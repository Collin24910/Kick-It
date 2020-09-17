import React, { Component } from "react";
import PropTypes from "prop-types";

import ThreadCommentBody from "./ThreadCommentBody";
import ThreadCommentField from "./ThreadCommentField";

class ThreadComment extends Component {
  render() {
    const {
      addComment,
      commenterId,
      comments,
      deleteComment,
      editComment,
      threadId,
      getUser,
      signedInUserId,
    } = this.props;

    return (
      <div>
        <hr
          style={{
            width: "90%",
          }}
        />

        {comments.map((comment) => (
          <ThreadCommentBody
            key={comment._id}
            commentId={comment._id}
            commenterId={comment.commenterId}
            deleteComment={deleteComment}
            editComment={editComment}
            getUser={getUser}
            threadId={threadId}
            signedInUserId={signedInUserId}
            text={comment.text}
            timestamp={comment.timestamp}
          />
        ))}

        <ThreadCommentField
          addComment={addComment}
          commenterId={commenterId}
          getUser={getUser}
          threadId={threadId}
        />
      </div>
    );
  }
}

ThreadComment.defaultProps = {
  comments: [],
};

ThreadComment.propTypes = {
  addComment: PropTypes.func.isRequired,
  commenterId: PropTypes.string.isRequired,
  comments: PropTypes.array,
  deleteComment: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  getUser: PropTypes.func.isRequired,
  threadId: PropTypes.string.isRequired,
  signedInUserId: PropTypes.string.isRequired,
};

export default ThreadComment;
