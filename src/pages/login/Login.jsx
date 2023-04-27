import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"

import { logIn } from "@/redux/actions/authenticationActions"

const Login = () => {
  const dispatch = useDispatch()
  const [responseData, setResponseData] = useState({})

  const {
    query: { code },
  } = useRouter()

  // Sends authorization code received from spotify in order to receive the access token.
  useEffect(() => {
    const performLogin = async () => {
      if (code) {
        try {
          const data = await dispatch(logIn(code))

          setResponseData(data)
        } catch ({ response }) {
          setResponseData(response.data)
        }
      }
    }

    performLogin()
  }, [code])

  const handleTestCookieButton = () => {
    get("/api/test-cookie")
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <pre>
        <code>{JSON.stringify(responseData, null, 2)}</code>
      </pre>
      <button onClick={handleTestCookieButton}>Test Cookie</button>
    </div>
  )
}

export default Login
