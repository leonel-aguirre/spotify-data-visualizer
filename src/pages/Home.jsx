import React from "react"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"

import { fetchAuthorizationURL } from "@/redux/actions/authenticationActions"

const Home = () => {
  const dispatch = useDispatch()
  const { push } = useRouter()

  const loginButtonHandler = async () => {
    const url = await dispatch(fetchAuthorizationURL())

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
