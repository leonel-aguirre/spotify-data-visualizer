import { set, ref } from "firebase/database"

import { auth, database } from "@/firebase-server"
import { get } from "@/axios/api"
import { filterArtistsFromList, topGenresFromArtistsList } from "./utils"

const handler = async (req, res) => {
  if (req.method === "POST") {
    const { token } = req.cookies
    const { token: firebaseToken, userID, type, timeRange } = req.body

    const headers = {
      Authorization: "Bearer " + token,
    }

    const body = {
      time_range: timeRange,
      limit: 50,
      offset: 0,
    }

    try {
      await auth.verifyIdToken(firebaseToken)

      let refinedData

      if (type === "genres" && timeRange === "full_activity") {
        const { data } = await get(
          `https://api.spotify.com/v1/me/top/artists`,
          {
            ...body,
            time_range: "long_term",
          },
          headers,
          true
        )

        refinedData = topGenresFromArtistsList(data.items)
      } else {
        const { data } = await get(
          `https://api.spotify.com/v1/me/top/${type}`,
          body,
          headers,
          true
        )

        refinedData = filterArtistsFromList(data.items)
      }

      await database
        .ref("topsByUser")
        .orderByChild("userID")
        .equalTo(userID)
        .once("value", async (snapshot) => {
          const data = snapshot.val()

          const entryID = Object.keys(data)[0]

          await set(
            ref(database, `topsByUser/${entryID}/${type}/${timeRange}`),
            {
              ...refinedData,
            }
          )
        })

      res.status(200).json({ success: "true" })
    } catch (error) {
      res.status(403).json({ success: "false" })
    }
  } else {
    res.status(400).json({ status: "error", message: "Wrong method used." })
  }
}

export default handler
