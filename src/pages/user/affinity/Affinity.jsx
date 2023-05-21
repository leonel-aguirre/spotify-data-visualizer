/* eslint-disable @next/next/no-img-element */
import "./Affinity.scss"

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"
import Head from "next/head"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFaceFrown } from "@fortawesome/free-solid-svg-icons"

import { useAuth } from "@/context/auth"
import { selectUser } from "@/redux/reducers/userReducer"
import { fetchFriendAffinityData } from "@/redux/actions/userActions"
import { snakeToTitleCase } from "@/utils"

const Compare = () => {
  const dispatch = useDispatch()
  const userData = useSelector(selectUser)
  const [affinityData, setAffinityData] = useState(null)

  const {
    query: { userID: userFriendID },
    replace,
  } = useRouter()
  const { user } = useAuth()

  // Fetches user affinity data based on URL username.
  useEffect(() => {
    const fetchAffinityData = async () => {
      const fetchedData = await dispatch(
        fetchFriendAffinityData(user, userData.userID, userFriendID)
      )
      setAffinityData(fetchedData)
    }

    if (user && userData.userID && userFriendID) {
      if (userData.userID === userFriendID) {
        // If userID is the same as the one coming from URL
        // browser will redirect to dashboard page.
        replace("/user/dashboard")
      } else {
        fetchAffinityData()
      }
    }
  }, [user, userData.userID, userFriendID])

  const renderTopPercentages = ({ type, range, affinity }) => {
    const shouldRenderIcon = affinity === null
    let bubbleColor = "default"

    if (affinity < 0.4) {
      bubbleColor = "danger"
    } else if (affinity >= 0.4 && affinity < 0.8) {
      bubbleColor = "warning"
    } else {
      bubbleColor = "success"
    }

    bubbleColor = affinity === null ? "default" : bubbleColor

    return (
      <div
        key={`top-${type}-${range}`}
        className="affinity__top-item-container"
      >
        <p
          className={`affinity__top-percentage-bubble affinity__top-percentage-bubble--is-${bubbleColor}`}
        >
          {shouldRenderIcon ? (
            <FontAwesomeIcon icon={faFaceFrown} />
          ) : (
            `${affinity * 100}%`
          )}
        </p>
        <p className="affinity__range-text">{snakeToTitleCase(range)}</p>
      </div>
    )
  }

  const renderAffinityData = (tops) => {
    if (!tops) {
      return null
    }

    const artistTypeTops = tops?.filter(({ type }) => type === "artists")
    const trackTypeTops = tops?.filter(({ type }) => type === "tracks")
    const genreTypeTops = tops?.filter(({ type }) => type === "genres")

    return (
      <>
        <div className="affinity__tops-group affinity__tops-group--is-artist-type">
          <h4 className="affinity__tops-group-title">Artists</h4>
          <div className="affinity__tops-percentages-wrapper">
            {artistTypeTops.map((top) => renderTopPercentages(top))}
          </div>
        </div>
        <div className="affinity__tops-group affinity__tops-group--is-track-type">
          <h4 className="affinity__tops-group-title">Tracks</h4>
          <div className="affinity__tops-percentages-wrapper">
            {trackTypeTops.map((top) => renderTopPercentages(top))}
          </div>
        </div>
        <div className="affinity__tops-group affinity__tops-group--is-genre-type">
          <h4 className="affinity__tops-group-title">Genres</h4>
          <div className="affinity__tops-percentages-wrapper">
            {genreTypeTops.map((top) => renderTopPercentages(top))}
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="affinity">
      <Head>
        <title>Friend Affinity</title>
      </Head>

      <header className="affinity__header">
        <h1 className="affinity__header-title">Friend Affinity</h1>
      </header>
      <main className="affinity__main-content">
        <section className="affinity__users-name-and-image-wrapper">
          <div className="affinity__user-name-and-image">
            <img
              className="affinity__user-image-bubble"
              src={userData?.userImageURL}
              alt=""
            />
            <p className="affinity__user-name">{userData?.userName}</p>
          </div>
          <div className="affinity__users-data-divider-wrapper">
            <div className="affinity__users-data-divider-item" />
            <div className="affinity__users-data-divider-item" />
            <div className="affinity__users-data-divider-item" />
          </div>
          <div className="affinity__user-name-and-image">
            <img
              className="affinity__user-image-bubble"
              src={affinityData?.friendImageURL}
              alt=""
            />
            <p className="affinity__user-name">
              {affinityData?.friendUserName}
            </p>
          </div>
        </section>
        <section className="affinity__affinity-data-wrapper">
          {renderAffinityData(affinityData?.topsAffinities)}
        </section>
      </main>
    </div>
  )
}

export default Compare
