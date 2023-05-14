import { ref, update } from "firebase/database"

import { auth, database } from "@/firebase-server"

// TODO: Remove when no longer needed.
// An example of how to use the database.
const handler = async (req, res) => {
  if (req.method === "GET") {
    const { token } = req.query

    try {
      await auth.verifyIdToken(token)

      await database.ref("test").once("value", (snapshot) => {
        const data = snapshot.val()

        if (data) {
          res.status(200).json({ status: "success", data })
        } else {
          res.status(400).json({ status: "error" })
        }
      })
    } catch (error) {
      res.status(401).json({ status: "error", message: error })
    }
  } else if (req.method === "POST") {
    const { token, data } = req.body

    try {
      await auth.verifyIdToken(token)

      await update(ref(database, "test"), {
        data: data,
      })

      res.status(200).json({ status: "success" })
    } catch (error) {
      console.error(error)
      res.status(401).json({ status: "error", message: error })
    }
  }
}

export default handler
