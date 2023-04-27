import { combineReducers } from "@reduxjs/toolkit"

import authenticationReducer from "./reducers/authenticationReducer"

export default combineReducers({
  authenticationReducer,
})
