import { auth, database } from "@/firebase-server"

const handler = async (req, res) => {
  const { token: firebaseToken, userID, type, timeRange } = req.query

  try {
    await auth.verifyIdToken(firebaseToken)

    await database
      .ref("topsByUser")
      .orderByChild("userID")
      .equalTo(userID)
      .once("value", async (snapshot) => {
        const data = snapshot.val()

        const entryID = Object.keys(data)[0]

        res
          .status(200)
          .json({ success: "true", data: data[entryID][type][timeRange] })
      })
  } catch (error) {
    res.status(403).json({ success: "false" })
  }
}

export default handler
