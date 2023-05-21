import { push, ref, update } from "firebase/database"

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

const updateUserFriends = async (userID, friendID) => {
  await database
    .ref("friendsByUser")
    .orderByChild("userID")
    .equalTo(userID)
    .once("value", async (snapshot) => {
      const data = snapshot.val()

      if (data) {
        const entryID = Object.keys(data)[0]

        const isFriendAlreadyAdded = data[entryID]?.friends?.includes(friendID)

        if (!isFriendAlreadyAdded) {
          if (!!data[entryID]?.friends) {
            await update(ref(database, `friendsByUser/${entryID}/friends`), {
              ...[...data[entryID]?.friends, friendID],
            })
          } else {
            await update(ref(database, `friendsByUser/${entryID}/friends`), {
              ...[friendID],
            })
          }
        }
      } else {
        await push(ref(database, `friendsByUser`), {
          userID: userID,
          friends: [friendID],
        })
      }
    })
}

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { token, userID, userFriendID } = req.query

    let friendTops
    let userTops
    let refinedData
    let friendImageURL
    let friendUserName

    try {
      await auth.verifyIdToken(token)

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
            res
              .status(400)
              .json({ success: false, message: "userID not found." })
          }
        })

      await updateUserFriends(userID, userFriendID)
      await updateUserFriends(userFriendID, userID)

      await database
        .ref("users")
        .orderByChild("userID")
        .equalTo(userFriendID)
        .once("value", async (snapshot) => {
          const data = snapshot.val()

          if (data) {
            const entryID = Object.keys(data)[0]

            friendImageURL = data[entryID]?.userImageURL
            friendUserName = data[entryID]?.userName
          } else {
            res
              .status(400)
              .json({ success: false, message: "userID is not registered." })
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

      res.status(200).json({
        success: true,
        data: { topsAffinities: refinedData, friendImageURL, friendUserName },
      })
    } catch (error) {
      res.status(401).json({ status: "error", message: "Unauthorized." })
    }
  } else {
    res.status(400).json({ status: "error", message: "Wrong method used." })
  }
}

export default handler
