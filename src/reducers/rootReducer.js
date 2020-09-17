import { combineReducers } from "redux";

import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import addicReducer from "./addicReducer";
import userReducer from "./userReducer";
import threadReducer from "./threadReducer";

export default combineReducers({
  authReducer,
  errorReducer,
  addicReducer,
  userReducer,
  threadReducer,
});
