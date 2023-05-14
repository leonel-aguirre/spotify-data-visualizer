import { get } from "@/axios/api"

const handler = async (req, res) => {
  const { token } = req.cookies

  const headers = {
    Authorization: "Bearer " + token,
  }

  try {
    const { data: user } = await get(
      "https://api.spotify.com/v1/me",
      null,
      headers,
      true
    )

    const filteredData = {
      userName: user.display_name,
      userImageURL: user.images[0].url,
      userEmail: user.email,
      userID: user.id,
    }

    // console.log({ user })

    res.status(200).json({ success: "true", user: filteredData })
  } catch (error) {
    res.status(403).json({ success: "false" })
  }
}

export default handler
