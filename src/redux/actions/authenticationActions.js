import { post, get } from "@/axios/api"

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

export const logOut = () => () => {
  post("/logout")
}

export const checkUserExist = (user, userData) => async () => {
  await post("/check-user", { token: await user.getIdToken(), userData })
}
