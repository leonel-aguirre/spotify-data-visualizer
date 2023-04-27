const handler = (req, res) => {
  console.log({ cookiesTest: req.cookies })

  res.status(200).json({ status: "success" })
}

export default handler
