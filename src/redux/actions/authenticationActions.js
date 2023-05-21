import { signOut } from "firebase/auth"

import { SET_AFTER_SIGN_IN_REDIRECT_URL } from "../reducers/authenticationReducer"
import { post, get } from "@/axios/api"
import { auth } from "@/firebase-client"

export const fetchAuthorizationURL = () => async () => {
  const {
    data: { url },
  } = await get("/spotify-auth-url")

  return url
}

export const logIn = (authorizationCode) => async () => {
  const { data } = await post("/login", {
    code: authorizationCode,
  })

  return data
}

export const logOut = () => async () => {
  await signOut(auth)
  await post("/logout")
}

export const checkUserExist = (user, userData) => async () => {
  await post("/check-user", { token: await user.getIdToken(), userData })
}

export const setAfterSignInRedirectURL = (url) => () => {
  localStorage.setItem(SET_AFTER_SIGN_IN_REDIRECT_URL, url)
}

export const getAfterSignInRedirectURL = () => () => {
  return localStorage.getItem(SET_AFTER_SIGN_IN_REDIRECT_URL)
}

export const unsetAfterSignInRedirectURL = () => () => {
  localStorage.removeItem(SET_AFTER_SIGN_IN_REDIRECT_URL)
}
