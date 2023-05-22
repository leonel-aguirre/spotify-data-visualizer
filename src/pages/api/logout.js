import cookie from "cookie"

const handler = async (req, res) => {
  res.setHeader(
    "Set-Cookie",
    cookie.serialize("token", "", {
      httpOnly: true,
      secure: false, // FIXME: Address for deployment.
      expires: new Date(0),
      sameSite: "lax", // FIXME: Address for deployment.
    })
  )

  res.status(200).json({ success: "true" })
}

export default handler
