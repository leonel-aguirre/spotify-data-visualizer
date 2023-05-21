import "./Login.scss"

import React, { useEffect } from "react"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import Head from "next/head"

import {
  getAfterSignInRedirectURL,
  logIn,
  unsetAfterSignInRedirectURL,
} from "@/redux/actions/authenticationActions"
import { authenticate } from "@/firebase-client"
import Loader from "@/components/Loader/Loader"

const Login = () => {
  const dispatch = useDispatch()
  const { replace } = useRouter()

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
            await authenticate()

            const afterSignInRedirectURL = await dispatch(
              getAfterSignInRedirectURL()
            )

            await dispatch(unsetAfterSignInRedirectURL())

            if (afterSignInRedirectURL) {
              replace(afterSignInRedirectURL)
            } else {
              replace("/user/dashboard")
            }
          }
        } catch {
          replace("/")
        }
      }
    }

    performLogin()
  }, [code])

  return (
    <div className="login">
      <Head>
        <title>Logging In...</title>
      </Head>

      <h1 className="login__title">Logging In...</h1>
      <Loader className="login__loader" size={Loader.LARGE} />
    </div>
  )
}

export default Login
