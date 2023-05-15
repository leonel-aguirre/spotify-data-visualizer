import {
  SET_TOPS_STATUS,
  SET_TOP_ARTISTS_LONG_TERM_STATUS,
  SET_TOP_ARTISTS_MID_TERM_STATUS,
  SET_TOP_ARTISTS_SHORT_TERM_STATUS,
  SET_TOP_TRACKS_LONG_TERM_STATUS,
  SET_TOP_TRACKS_MID_TERM_STATUS,
  SET_TOP_TRACKS_SHORT_TERM_STATUS,
  SET_USER_DATA,
} from "../reducers/userReducer"
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

export const fetchStoredUserTopsStatus = (user, userID) => async (dispatch) => {
  try {
    const { data } = await get("/stored-user-tops", {
      token: await user.getIdToken(),
      userID,
    })

    dispatch({
      type: SET_TOPS_STATUS,
      payload: {
        data: data.data,
      },
    })
  } catch (error) {
    // TODO: Handle error.
  }
}

export const createTop =
  (user, userID, type, timeRange) => async (dispatch) => {
    console.log({ userID, type, timeRange })

    let actionType = ""

    switch (timeRange) {
      case "short_term":
        actionType =
          type === "artists"
            ? SET_TOP_ARTISTS_SHORT_TERM_STATUS
            : SET_TOP_TRACKS_SHORT_TERM_STATUS
        break
      case "medium_term":
        actionType =
          type === "artists"
            ? SET_TOP_ARTISTS_MID_TERM_STATUS
            : SET_TOP_TRACKS_MID_TERM_STATUS
        break
      case "long_term":
        actionType =
          type === "artists"
            ? SET_TOP_ARTISTS_LONG_TERM_STATUS
            : SET_TOP_TRACKS_LONG_TERM_STATUS
        break
    }

    try {
      await post("/create-top", {
        token: await user.getIdToken(),
        userID,
        type,
        timeRange,
      })

      dispatch({
        type: actionType,
        payload: {
          data: true,
        },
      })
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
