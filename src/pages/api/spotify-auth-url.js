import { jsonToQueryParams } from "@/utils"

const clientID = process.env.NEXT_PUBLIC_CLIENT_ID

const SPOTIFY_AUTH_BASE_URL = "https://accounts.spotify.com/authorize"
const SPOTIFY_SCOPE_LIST = "user-read-private user-read-email user-top-read"

const handler = (_req, res) => {
  const responseURL =
    SPOTIFY_AUTH_BASE_URL +
    "?" +
    jsonToQueryParams({
      response_type: "code",
      client_id: clientID,
      scope: SPOTIFY_SCOPE_LIST,
      redirect_uri: "http://localhost:3000/login",
      show_dialog: true,
    })

  res.status(200).json({ url: responseURL })
}

export default handler
