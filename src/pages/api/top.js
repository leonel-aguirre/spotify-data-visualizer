import { get } from "@/axios/api"
import { topGenresFromList } from "./utils"

const handler = async (req, res) => {
  const { token } = req.cookies
  const { type, range } = req.query

  const headers = {
    Authorization: "Bearer " + token,
  }

  const body = {
    time_range: range,
    limit: 50,
    offset: 0,
  }

  try {
    const { data } = await get(
      `https://api.spotify.com/v1/me/top/${type}`,
      body,
      headers,
      true
    )

    const refinedData = topGenresFromList(data.items)

    res.status(200).json({ success: "true", topArtists: refinedData })
  } catch (error) {
    res.status(403).json({ success: "false" })
  }
}

export default handler
