import { push, ref } from "firebase/database"

import { getAffinityPercentage } from "./utils"
import { auth, database } from "@/firebase-server"

const possibleTops = [
  {
    type: "artists",
    range: "short_term",
  },
  {
    type: "artists",
    range: "medium_term",
  },
  {
    type: "artists",
    range: "long_term",
  },
  {
    type: "tracks",
    range: "short_term",
  },
  {
    type: "tracks",
    range: "medium_term",
  },
  {
    type: "tracks",
    range: "long_term",
  },
  {
    type: "genres",
    range: "full_activity",
  },
]

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { token, userID, userFriendID } = req.query

    let friendTops
    let userTops
    let refinedData

    await database
      .ref("topsByUser")
      .orderByChild("userID")
      .equalTo(userFriendID)
      .once("value", async (snapshot) => {
        const data = snapshot.val()

        if (data) {
          const entryID = Object.keys(data)[0]

          friendTops = data[entryID]
        } else {
          res
            .status(400)
            .json({ success: false, message: "userFriendID not found." })
        }
      })

    await database
      .ref("topsByUser")
      .orderByChild("userID")
      .equalTo(userID)
      .once("value", async (snapshot) => {
        const data = snapshot.val()

        if (data) {
          const entryID = Object.keys(data)[0]

          userTops = data[entryID]
        } else {
          res.status(400).json({ success: false, message: "userID not found." })
        }
      })

    refinedData = possibleTops.map((top) => {
      if (
        !!friendTops?.[top.type]?.[top.range] &&
        !!userTops?.[top.type]?.[top.range]
      ) {
        let topAData = userTops?.[top.type]?.[top.range]
        let topBData = friendTops?.[top.type]?.[top.range]

        return { ...top, affinity: getAffinityPercentage(topAData, topBData) }
      } else {
        return { ...top, affinity: null }
      }
    })

    res.status(200).json({ success: true, data: refinedData })
  }
}

export default handler
