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

const updateUserFriends = async (userID, friendData) => {
  let refinedFriendData = { ...friendData }

  delete refinedFriendData.userEmail

  await database
    .ref("friendsByUser")
    .orderByChild("userID")
    .equalTo(userID)
    .once("value", async (snapshot) => {
      const data = snapshot.val()

      if (data) {
        const entryID = Object.keys(data)[0]

        const isFriendAlreadyAdded = data[entryID]?.friends?.some(
          (friend) => friend?.userID === refinedFriendData?.userID
        )

        if (!isFriendAlreadyAdded) {
          if (!!data[entryID]?.friends) {
            await update(ref(database, `friendsByUser/${entryID}/friends`), {
              ...[...data[entryID]?.friends, { ...refinedFriendData }],
            })
          } else {
            await update(ref(database, `friendsByUser/${entryID}/friends`), {
              ...[{ ...refinedFriendData }],
            })
          }
        }
      } else {
        await push(ref(database, `friendsByUser`), {
          userID: userID,
          friends: [{ ...refinedFriendData }],
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
    let userData
    let friendData

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

      await database
        .ref("users")
        .orderByChild("userID")
        .equalTo(userFriendID)
        .once("value", async (snapshot) => {
          const data = snapshot.val()

          if (data) {
            const entryID = Object.keys(data)[0]

            friendData = data[entryID]
          } else {
            res
              .status(400)
              .json({ success: false, message: "userID is not registered." })
          }
        })

      await database
        .ref("users")
        .orderByChild("userID")
        .equalTo(userID)
        .once("value", async (snapshot) => {
          const data = snapshot.val()

          if (data) {
            const entryID = Object.keys(data)[0]

            userData = data[entryID]
          } else {
            res
              .status(400)
              .json({ success: false, message: "userID is not registered." })
          }
        })

      await updateUserFriends(userID, friendData)
      await updateUserFriends(userFriendID, userData)

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
        data: {
          topsAffinities: refinedData,
          friendImageURL: friendData?.userImageURL,
          friendUserName: friendData?.userName,
        },
      })
    } catch (error) {
      res.status(401).json({ status: "error", message: "Unauthorized." })
    }
  } else {
    res.status(400).json({ status: "error", message: "Wrong method used." })
  }
}

export default handler
