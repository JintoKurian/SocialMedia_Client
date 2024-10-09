// index.js

import { combineReducers } from "redux";
import authReducer from "./AuthReducer";
import postReducer from "./PostReducer";
import chatReducer from "./ChatUserReducer";
import commentReducer from "./commentReducer"; // Import the comment reducer
import adminReducer from "./AdminReducer";
const rootReducer = combineReducers({
  authReducer,
  postReducer,
  chatReducer,
  commentReducer, // Add the comment reducer to combineReducers
  adminReducer
});

export default rootReducer;





// import { combineReducers } from "redux";

// import authReducer from "./AuthReducer";
// import postReducer from "./PostReducer";
// import chatReducer from "./ChatUserReducer";

// export const reducers = combineReducers({authReducer,postReducer, chatReducer})