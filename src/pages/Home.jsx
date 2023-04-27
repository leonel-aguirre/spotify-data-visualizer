import React from "react"
import { useRouter } from "next/router"

import { get } from "@/axios/api"

const Home = () => {
  const { push } = useRouter()

  const loginButtonHandler = async () => {
    const {
      data: { url },
    } = await get("/spotify-auth-url")

    if (url) {
      push(url)
    }
  }

  return (
    <div className="home">
      <h1>TEST</h1>
      <button onClick={loginButtonHandler}>Login</button>
    </div>
  )
}

export default Home
