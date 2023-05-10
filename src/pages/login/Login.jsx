import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import Head from "next/head"

import { logIn, logOut } from "@/redux/actions/authenticationActions"

const Login = () => {
  const dispatch = useDispatch()
  const { replace } = useRouter()
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

          if (data?.success === "true") {
            replace("/dashboard")
          }
          setResponseData(data)
        } catch ({ response }) {
          setResponseData(response.data)
        }
      }
    }

    performLogin()
  }, [code])

  const handleLogOutButton = () => {
    dispatch(logOut())
  }

  return (
    <div className="login">
      <Head>
        <title>Login</title>
      </Head>

      <h1>Login</h1>
      <pre>
        <code>{JSON.stringify(responseData, null, 2)}</code>
      </pre>
      <button onClick={handleLogOutButton}>Log Out</button>
    </div>
  )
}

export default Login
