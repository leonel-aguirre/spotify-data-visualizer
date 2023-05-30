import "./Home.scss"

import React, { useState } from "react"
import { useRouter } from "next/router"
import { useDispatch } from "react-redux"
import Head from "next/head"

import { fetchAuthorizationURL } from "@/redux/actions/authenticationActions"
import Button from "@/components/Button/Button"

const Home = () => {
  const dispatch = useDispatch()
  const { push } = useRouter()
  const [isButtonDisabled, setIsButtonDisabled] = useState()

  const loginButtonHandler = async () => {
    setIsButtonDisabled(true)
    const url = await dispatch(fetchAuthorizationURL())
    setIsButtonDisabled(false)

    if (url) {
      push(url)
    }
  }

  return (
    <div className="home">
      <Head>
        <title>Audiograph</title>
        <meta
          name="description"
          content="Visualize Your Music, Hear Your Data"
          key="desc"
        />
        <meta
          property="og:title"
          content="Visualize Your Music, Hear Your Data"
        />
        <meta
          property="og:description"
          content="Visualize Your Music, Hear Your Data"
        />
        <meta property="og:image" content="/static/images/logo.svg" />
      </Head>

      <div className="home__content-wrapper">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/static/images/logo.svg" className="home__logo" alt="Logo" />
        <div className="home__texts-container">
          <h1 className="home__tag-line">
            Visualize Your Music, Hear Your Data
          </h1>
          <p className="home__description">
            Audiograph visualizes your music and listening habits, allowing you
            to easily track your top genres, artists, and tracks over time and
            compare your activity to others.
          </p>
        </div>
        <div className="home__sign-in-cta-container">
          <Button
            className="home__sign-in-cta"
            onClick={loginButtonHandler}
            isSmall={true}
            type={Button.SUCCESS}
            isDisabled={isButtonDisabled}
          >
            Sign In With Your Spotify Account
          </Button>
        </div>
      </div>
    </div>
  )
}

export default Home
