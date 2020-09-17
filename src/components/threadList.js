import React, { Component } from "react";
import PropTypes from "prop-types";
import Thread from "./thread";
import Loading from "./Loading";

class threadList extends Component {
  state = {
    loading: true,
    threadPage: false,
  };

  componentDidMount = () => {
    const { getThreads } = this.props;
    getThreads().then(() => {
      this.setState({
        loading: false,
      });
    });
  };

  checkOnThreadPage = (onThreadPage, CurThread) => {
    if (onThreadPage) {
      const { threadId } = this.props;
      return threadId === CurThread;
    }
    return true;
  };

  render() {
    const {
      addComment,
      deleteComment,
      deleteThread,
      editComment,
      editThread,
      getUser,
      threads,
      user,
      onThreadPage,
    } = this.props;
    const { loading } = this.state;

    return loading ? (
      <Loading />
    ) : (
      <div>
        {threads.map((thread) =>
          this.checkOnThreadPage(onThreadPage, thread._id) ? (
            <Thread
              key={thread._id}
              _id={thread._id}
              authorId={thread.authorId}
              comments={thread.comments}
              topic={thread.topic}
              signedInUserId={user.userId}
              timestamp={thread.timestamp}
              text={thread.text}
              onThreadPage={onThreadPage}
              addComment={(action, commenterId, threadId, text, timestamp) =>
                addComment(action, commenterId, threadId, text, timestamp)
              }
              deleteComment={(action, commentId, threadId) =>
                deleteComment(action, commentId, threadId)
              }
              deleteThread={(id) => deleteThread(id)}
              editComment={(action, commentId, threadId, text) =>
                editComment(action, commentId, threadId, text)
              }
              editThread={(id, name, author) => editThread(id, name, author)}
              getUser={(id) => getUser(id)}
            />
          ) : null
        )}
      </div>
    );
  }
}

threadList.defaultProps = {
  threads: [
    {
      comments: [],
    },
  ],
  match: {
    params: {
      id: "",
    },
  },
};

threadList.propTypes = {
  addComment: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  deleteThread: PropTypes.func.isRequired,
  editComment: PropTypes.func.isRequired,
  editThread: PropTypes.func.isRequired,
  getThreads: PropTypes.func.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  threads: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      authorId: PropTypes.string.isRequired,
      comments: PropTypes.array,
      name: PropTypes.string.isRequired,
      timestamp: PropTypes.number.isRequired,
      text: PropTypes.string.isRequired,
    })
  ),
  getUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    userId: PropTypes.string.isRequired,
  }).isRequired,
};

export default threadList;
