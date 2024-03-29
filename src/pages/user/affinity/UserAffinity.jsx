/* eslint-disable @next/next/no-img-element */
import "./UserAffinity.scss"

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
import Loader from "@/components/Loader/Loader"
import Button from "@/components/Button/Button"
import BubbleDisplayImage from "@/components/BubbleDisplayImage/BubbleDisplayImage"

const UserAffinity = () => {
  const dispatch = useDispatch()
  const userData = useSelector(selectUser)
  const [affinityData, setAffinityData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const shouldRenderNoteSection = affinityData?.topsAffinities?.some(
    ({ affinity }) => affinity === null
  )

  const {
    query: { userID: userFriendID },
    replace,
    push,
  } = useRouter()

  const { user } = useAuth()

  // Fetches user affinity data based on URL username.
  useEffect(() => {
    const fetchAffinityData = async () => {
      setIsLoading(true)

      const fetchedData = await dispatch(
        fetchFriendAffinityData(user, userData.userID, userFriendID)
      )

      setAffinityData(fetchedData)
      setIsLoading(false)
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

  const backButtonHandler = () => {
    push("/user/dashboard")
  }

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
        className="user-affinity__top-item-container"
      >
        <p
          className={`user-affinity__top-percentage-bubble user-affinity__top-percentage-bubble--is-${bubbleColor}`}
        >
          {shouldRenderIcon ? (
            <FontAwesomeIcon icon={faFaceFrown} />
          ) : (
            `${Math.round(affinity * 100)}%`
          )}
        </p>
        <p className="user-affinity__range-text">{snakeToTitleCase(range)}</p>
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
        <div className="user-affinity__tops-group user-affinity__tops-group--is-artist-type">
          <h4 className="user-affinity__tops-group-title">Artists</h4>
          <div className="user-affinity__tops-percentages-wrapper">
            {artistTypeTops.map((top) => renderTopPercentages(top))}
          </div>
        </div>
        <div className="user-affinity__tops-group user-affinity__tops-group--is-track-type">
          <h4 className="user-affinity__tops-group-title">Tracks</h4>
          <div className="user-affinity__tops-percentages-wrapper">
            {trackTypeTops.map((top) => renderTopPercentages(top))}
          </div>
        </div>
        <div className="user-affinity__tops-group user-affinity__tops-group--is-genre-type">
          <h4 className="user-affinity__tops-group-title">Genres</h4>
          <div className="user-affinity__tops-percentages-wrapper">
            {genreTypeTops.map((top) => renderTopPercentages(top))}
          </div>
        </div>
      </>
    )
  }

  const renderMainContent = () => {
    if (isLoading) {
      return <Loader className="user-affinity__loader" size={Loader.LARGE} />
    } else {
      return (
        <main className="user-affinity__main-content">
          <section className="user-affinity__page-description-wrapper">
            <h4 className="user-affinity__page-description-title">
              Discover Your Musical Affinity
            </h4>
            <p className="user-affinity__page-description-subtitle">
              Let the melodies guide your friendship, and enjoy discovering your
              musical affinity on this Friendship Affinity Page!
            </p>
          </section>
          <section className="user-affinity__users-name-and-image-wrapper">
            <div className="user-affinity__user-name-and-image">
              <BubbleDisplayImage
                userImageURL={userData?.userImageURL}
                userName={userData?.userName}
                className="user-affinity__user-image-bubble"
                size={BubbleDisplayImage.LARGE}
              />
              <p className="user-affinity__user-name">{userData?.userName}</p>
            </div>
            <div className="user-affinity__users-data-divider-wrapper">
              <div className="user-affinity__users-data-divider-item" />
              <div className="user-affinity__users-data-divider-item" />
              <div className="user-affinity__users-data-divider-item" />
            </div>
            <div className="user-affinity__user-name-and-image">
              <BubbleDisplayImage
                userImageURL={affinityData?.friendImageURL}
                userName={affinityData?.friendUserName}
                className="user-affinity__user-image-bubble"
                size={BubbleDisplayImage.LARGE}
              />
              <p className="user-affinity__user-name">
                {affinityData?.friendUserName}
              </p>
            </div>
          </section>
          <section className="user-affinity__affinity-data-wrapper">
            {renderAffinityData(affinityData?.topsAffinities)}
          </section>
          {shouldRenderNoteSection && (
            <section className="user-affinity__note-section">
              <p className="user-affinity__note">
                <span className="user-affinity__note-label">NOTE: </span>
                It seems that either you or your friend are missing some top
                picks in certain categories. These missing entries are marked
                with a sad face ({<FontAwesomeIcon icon={faFaceFrown} />}).
                {` But don't worry! You can easily create and update these missing 
          tops to get a more accurate measure of your musical affinity. Simply 
          create them from your dashboard and return to this page later to see 
          the updated affinity percentage.`}
              </p>
            </section>
          )}
        </main>
      )
    }
  }

  return (
    <div className="user-affinity">
      <Head>
        <title>Friendship Affinity</title>
      </Head>

      <section className="user-affinity__back-button-section">
        <Button
          className="user-affinity__back-button"
          onClick={backButtonHandler}
          isSmall={true}
          type={Button.DEFAULT}
        >
          Back
        </Button>
      </section>

      <header className="user-affinity__header">
        <h1 className="user-affinity__header-title">Friendship Affinity</h1>
      </header>

      {renderMainContent()}
    </div>
  )
}

export default UserAffinity
