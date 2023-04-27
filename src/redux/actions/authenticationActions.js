import { post, get } from "@/axios/api"

export const fetchAuthorizationURL = () => async () => {
  const {
    data: { url },
  } = await get("/spotify-auth-url")

  return url
}

export const logIn = (authorizationCode) => async (dispatch) => {
  const { data } = await post("/login", {
    code: authorizationCode,
  })

  return data
}

// TODO: Implement function, BE must remove http-only cookie token.
export const logOut = () => {}
