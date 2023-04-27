import { jsonToQueryParams } from "@/utils"

const clientID = process.env.NEXT_PUBLIC_CLIENT_ID

const handler = (_req, res) => {
  const responseURL =
    "https://accounts.spotify.com/authorize?" +
    jsonToQueryParams({
      response_type: "code",
      client_id: clientID,
      scope: "user-read-private user-read-email user-top-read",
      redirect_uri: "http://localhost:3000/login",
    })

  res.status(200).json({ url: responseURL })
}

export default handler
