import { SET_USER_DATA } from "../reducers/userReducer"
import { get, post } from "@/axios/api"

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

export const databaseTest = (user) => async (_dispatch) => {
  await post("/database-test", {
    token: await user.getIdToken(),
    data: Date.now(),
  })

  const response = await get("/database-test", {
    token: await user.getIdToken(),
  })

  console.log(response.data.data.data)
}
