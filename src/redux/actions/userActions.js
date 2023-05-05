import { get } from "@/axios/api"
import { SET_USER_DATA } from "../reducers/userReducer"

export const fetchUserData = () => async (dispatch) => {
  try {
    const {
      data: { user },
    } = await get("/user-data")

    dispatch({
      type: SET_USER_DATA,
      payload: {
        data: user,
      },
    })
  } catch (error) {
    // TODO: Handle error.
  }
}

export const fetchUserLongTermTopArtists = () => async (dispatch) => {
  try {
    const {
      data: { topArtists },
    } = await get("/top", {
      type: "artists",
      range: "long_term",
    })

    // TODO: Store with redux.
  } catch (error) {
    // TODO: Handle error.
  }
}
