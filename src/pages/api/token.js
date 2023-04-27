import { jsonToQueryParams } from "@/utils"
import cookie from "cookie"

const clientID = process.env.NEXT_PUBLIC_CLIENT_ID
const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET

const handler = (req, res) => {
  const { code } = req?.body

  const body = jsonToQueryParams({
    code,
    grant_type: "authorization_code",
    redirect_uri: "http://localhost:3000/login",
  })

  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        new Buffer.from(clientID + ":" + clientSecret).toString("base64"),
    },
    body: body,
  })
    .then((response) => response.text())
    .then((data) => {
      const { access_token, expires_in, refresh_token } = JSON.parse(data)

      res.setHeader(
        "Set-Cookie",
        cookie.serialize("token", access_token, {
          httpOnly: true,
          secure: false, // FIXME: Address for deployment.
          maxAge: 60 * 60,
          sameSite: "lax", // FIXME: Address for deployment.
        })
      )

      // TODO: For testing purposes, remove when unneeded.
      console.log({ access_token, expires_in, refresh_token })

      res.status(200).json({ success: "true" })
    })
}

export default handler
