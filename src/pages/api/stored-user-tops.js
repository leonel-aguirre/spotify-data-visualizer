import { push, ref } from "firebase/database"

import { auth, database } from "@/firebase-server"

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { token, userID } = req.query

    let existingTops = {
      artistShortTerm: false,
      artistMidTerm: false,
      artistLongTerm: false,
      trackShortTerm: false,
      trackMidTerm: false,
      trackLongTerm: false,
    }

    try {
      await auth.verifyIdToken(token)

      await database
        .ref("topsByUser")
        .orderByChild("userID")
        .equalTo(userID)
        .once("value", async (snapshot) => {
          const data = snapshot.val()

          if (!data) {
            await push(ref(database, `topsByUser`), {
              userID,
            })
          } else {
            const entryID = Object.keys(data)[0]

            existingTops = {
              artistShortTerm: !!data[entryID]?.artists?.short_term,
              artistMidTerm: !!data[entryID]?.artists?.medium_term,
              artistLongTerm: !!data[entryID]?.artists?.long_term,
              trackShortTerm: !!data[entryID]?.tracks?.short_term,
              trackMidTerm: !!data[entryID]?.tracks?.medium_term,
              trackLongTerm: !!data[entryID]?.tracks?.long_term,
            }
          }
        })

      res.status(200).json({ status: "success", data: existingTops })
    } catch (error) {
      res.status(401).json({ status: "error", message: "Unauthorized." })
    }
  } else {
    res.status(400).json({ status: "error", message: "Wrong method used." })
  }
}

export default handler
