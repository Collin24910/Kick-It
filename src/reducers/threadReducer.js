import {
  ADD_COMMENT_THREAD,
  DELETE_COMMENT_THREAD,
  EDIT_COMMENT_THREAD,
  GET_THREADS,
  CREATE_THREAD,
  EDIT_THREAD,
  DELETE_THREAD,
  GET_THREAD,
} from "../actions/actionType";

const initialState = {
  threads: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT_THREAD:
      return {
        ...state,
        threads: state.threads.map((thread) => {
          if (thread._id === action.payload._id) {
            return {
              ...thread,
              comments: [
                ...thread.comments,
                {
                  _id:
                    action.payload.comments[action.payload.comments.length - 1]
                      ._id,
                  commenterId: action.commenterId,
                  text: action.text,
                  timestamp: action.timestamp,
                },
              ],
            };
          }
          return thread;
        }),
      };
    case DELETE_COMMENT_THREAD:
      return {
        ...state,
        threads: state.threads.map((thread) => {
          if (thread._id === action.payload._id) {
            return {
              ...thread,
              comments: action.payload.comments,
            };
          }
          return thread;
        }),
      };
    case EDIT_COMMENT_THREAD:
      return {
        ...state,
        threads: state.threads.map((thread) => {
          if (thread._id === action.payload._id) {
            return {
              ...thread,
              comments: action.payload.comments,
            };
          }
          return thread;
        }),
      };
    case GET_THREADS:
      return {
        ...initialState,
        threads: action.payload,
      };

    case GET_THREAD:
      return {
        ...state,
        threads: state.threads.map((thread) => {
          if (thread._id === action.id) {
            return thread;
          }
          return thread;
        }),
      };

    case CREATE_THREAD: {
      return {
        ...state,
        threads: [
          {
            _id: action.payload._id,
            author: action.payload.author,
            authorId: action.payload.authorId,
            comments: [],
            topic: action.payload.topic,
            timestamp: action.payload.timestamp,
            text: action.payload.text,
          },
          ...state.threads,
        ],
      };
    }
    case EDIT_THREAD: {
      return {
        ...state,
        threads: state.threads.map((thread) => {
          if (thread._id === action.id) {
            return {
              ...thread,
              text: action.text,
              author: action.author,
            };
          }
          return thread;
        }),
      };
    }
    case DELETE_THREAD: {
      return {
        ...state,
        threads: state.threads.filter(({ _id }) => _id !== action.id),
      };
    }
    default:
      return state;
  }
};
