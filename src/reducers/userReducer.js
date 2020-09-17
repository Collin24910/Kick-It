import {
  GET_USER,
  GET_ALL_USERS,
  UPDATE_ADDICPIN,
  //GET_PIND,
} from "../actions/actionType";

const initialState = {
  allUsers: [],
  addics: [],
  currUser: {},
  pind: "",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_USER:
      return {
        ...state,
        currUser: action.payload,
      };
    case GET_ALL_USERS:
      return {
        ...state,
        allUsers: action.payload,
      };

    case UPDATE_ADDICPIN:
      return {
        ...state,
        currUser: {
          pind: action.payload.pind,
        },
      };

    default:
      return state;
  }
}
