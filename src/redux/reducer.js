import { combineReducers } from "@reduxjs/toolkit"

import authenticationReducer from "./reducers/authenticationReducer"
import userReducer from "./reducers/userReducer"

export default combineReducers({
  authenticationReducer,
  userReducer,
})
