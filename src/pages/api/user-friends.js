import { auth, database } from "@/firebase-server"

const handler = async (req, res) => {
  if (req.method === "GET") {
    const { token, userID } = req.query

    try {
      await auth.verifyIdToken(token)

      await database
        .ref("friendsByUser")
        .orderByChild("userID")
        .equalTo(userID)
        .once("value", async (snapshot) => {
          const data = snapshot.val()

          if (data) {
            const entryID = Object.keys(data)[0]

            const userFriends = data[entryID]?.friends

            res.status(200).json({
              success: true,
              data: { userFriends },
            })
          } else {
            res
              .status(400)
              .json({ success: false, message: "userID not found." })
          }
        })
    } catch (error) {
      res.status(401).json({ status: "error", message: "Unauthorized." })
    }
  } else {
    res.status(400).json({ status: "error", message: "Wrong method used." })
  }
}

export default handler
