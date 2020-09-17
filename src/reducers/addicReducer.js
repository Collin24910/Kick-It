import {
  ADD_COMMENT,
  DELETE_COMMENT,
  EDIT_COMMENT,
  GET_ADDICS,
  CREATE_ADDIC,
  EDIT_ADDIC,
  DELETE_ADDIC,
  UPDATE_ADDIC_LIKES,
  UPDATE_TIMESTAMP,
  UPDATE_CARDCOLOR,
  UPDATE_ADDICPIN,
  GET_ADDIC,
} from "../actions/actionType";

const initialState = {
  adds: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_COMMENT:
      return {
        ...state,
        adds: state.adds.map((addic) => {
          if (addic._id === action.payload._id) {
            return {
              ...addic,
              comments: [
                ...addic.comments,
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
          return addic;
        }),
      };
    case DELETE_COMMENT:
      return {
        ...state,
        adds: state.adds.map((addic) => {
          if (addic._id === action.payload._id) {
            return {
              ...addic,
              comments: action.payload.comments,
            };
          }
          return addic;
        }),
      };
    case EDIT_COMMENT:
      return {
        ...state,
        adds: state.adds.map((addic) => {
          if (addic._id === action.payload._id) {
            return {
              ...addic,
              comments: action.payload.comments,
            };
          }
          return addic;
        }),
      };
    case GET_ADDICS:
      return {
        ...initialState,
        adds: action.payload,
      };

    case GET_ADDIC:
      return {
        ...state,
        adds: state.adds.map((addic) => {
          if (addic._id === action.id) {
            return addic;
          }
          return addic;
        }),
      };

    case CREATE_ADDIC: {
      return {
        ...state,
        adds: [
          {
            _id: action.payload._id,
            author: action.payload.author,
            authorId: action.payload.authorId,
            comments: [],
            likers: action.payload.likers,
            likesCount: action.payload.likesCount,
            name: action.payload.name,
            timestamp: action.payload.timestamp,
            goal: action.payload.goal,
            cardColor: action.payload,
          },
          ...state.adds,
        ],
      };
    }
    case EDIT_ADDIC: {
      return {
        ...state,
        adds: state.adds.map((addic) => {
          if (addic._id === action.id) {
            return {
              ...addic,
              name: action.name,
              author: action.author,
              goal: action.goal,
            };
          }
          return addic;
        }),
      };
    }
    case UPDATE_ADDIC_LIKES: {
      return {
        ...state,
        adds: state.adds.map((addic) => {
          if (addic._id === action.payload._id) {
            return {
              ...addic,
              likers: action.payload.likers,
              likesCount: action.payload.likesCount,
            };
          }
          return addic;
        }),
      };
    }

    case UPDATE_TIMESTAMP: {
      return {
        ...state,
        adds: state.adds.map((addic) => {
          if (addic._id === action.payload._id) {
            return {
              ...addic,
              timestamp: action.payload.timestamp,
            };
          }
          return addic;
        }),
      };
    }

    case UPDATE_ADDICPIN: {
      return {
        ...state,
        adds: state.adds.map((addic) => {
          if (addic._id === action.payload._id) {
            return {
              ...addic,
              pinned: action.payload.pinned,
            };
          }
          return addic;
        }),
      };
    }

    case UPDATE_CARDCOLOR: {
      return {
        ...state,
        adds: state.adds.map((addic) => {
          if (addic._id === action.payload._id) {
            return {
              ...addic,
              cardColor: action.payload.cardColor,
            };
          }
          return addic;
        }),
      };
    }

    case DELETE_ADDIC: {
      return {
        ...state,
        adds: state.adds.filter(({ _id }) => _id !== action.id),
      };
    }
    default:
      return state;
  }
};
