export const SET_USER_DATA = "SET_USER_DATA"

export const defaultState = {
  userName: "",
  imageURL: "",
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...defaultState,
        ...action.payload.data,
      }
      break
    default:
      return state
  }
}

export default reducer

export const selectUserName = (state) => state.userReducer.userName
export const selectImageURL = (state) => state.userReducer.imageURL
