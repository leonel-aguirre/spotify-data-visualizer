export const SET_USER_DATA = "SET_USER_DATA"

export const defaultState = {
  user: {},
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...defaultState,
        user: { ...action.payload.data },
      }
    default:
      return state
  }
}

export default reducer

export const selectUser = (state) => state.userReducer.user
