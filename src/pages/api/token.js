import { jsonToQueryParams } from "@/utils";

const clientID = process.env.NEXT_PUBLIC_CLIENT_ID;
const clientSecret = process.env.NEXT_PUBLIC_CLIENT_SECRET;

console.log({ clientID, clientSecret });

const handler = (req, res) => {
  const { code } = req?.body;

  const body = jsonToQueryParams({
    code,
    grant_type: "authorization_code",
    redirect_uri: "http://localhost:3000/login",
  });

  fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        new Buffer.from(clientID + ":" + clientSecret).toString("base64"),
    },
    body: body,
  })
    .then((response) => response.text())
    .then((data) => res.status(200).json(JSON.parse(data)));
};

export default handler;
