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

export const fetchUserTop =
  (user, userID, type, timeRange) => async (_dispatch) => {
    try {
      const { data } = await get("/top", {
        token: await user.getIdToken(),
        userID,
        type,
        timeRange,
      })

      return data.data
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
