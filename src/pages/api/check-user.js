import { push, ref } from "firebase/database"

import { auth, database } from "@/firebase-server"

const handler = async (req, res) => {
  const { token, userData } = req.body

  const { userID } = userData

  try {
    await auth.verifyIdToken(token)

    await database
      .ref("users")
      .orderByChild("userID")
      .equalTo(userID)
      .once("value", async (snapshot) => {
        const data = snapshot.val()

        console.log({ status: !data ? "Not Found" : "Found" })

        if (!data) {
          await push(ref(database, `users`), {
            ...userData,
          })
        }
      })

    res.status(200).json({ status: "success" })
  } catch (error) {
    console.error(error)
    res.status(401).json({ status: "error", message: error })
  }
}

export default handler
