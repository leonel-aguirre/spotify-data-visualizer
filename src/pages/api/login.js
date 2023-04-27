import cookie from "cookie"

import { post } from "@/axios/api"
import { jsonToQueryParams } from "@/utils"

const clientID = process.env.NEXT_PUBLIC_CLIENT_ID
const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET

const handler = async (req, res) => {
  const { code } = req?.body

  const body = jsonToQueryParams({
    code,
    grant_type: "authorization_code",
    redirect_uri: "http://localhost:3000/login",
  })

  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
    Authorization:
      "Basic " +
      new Buffer.from(clientID + ":" + clientSecret).toString("base64"),
  }

  try {
    const { data } = await post(
      "https://accounts.spotify.com/api/token",
      body,
      headers,
      true
    )

    const { access_token, expires_in, refresh_token } = data

    // TODO: For testing purposes, remove when unneeded.
    console.log({ access_token, expires_in, refresh_token })

    res.setHeader(
      "Set-Cookie",
      cookie.serialize("token", access_token, {
        httpOnly: true,
        secure: false, // FIXME: Address for deployment.
        maxAge: 60 * 60,
        sameSite: "lax", // FIXME: Address for deployment.
      })
    )

    res.status(200).json({ success: "true" })
  } catch (error) {
    res.status(403).json({
      success: "false",
      message: "Authorization not granted, try again.",
    })
  }
}

export default handler
