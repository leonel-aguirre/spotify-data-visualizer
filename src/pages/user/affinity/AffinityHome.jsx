/* eslint-disable @next/next/no-img-element */
import "./AffinityHome.scss"

import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Head from "next/head"
import { useRouter } from "next/router"

import { useAuth } from "@/context/auth"
import { selectUser } from "@/redux/reducers/userReducer"
import { fetchUserFriends } from "@/redux/actions/userActions"
import Loader from "@/components/Loader/Loader"
import Button from "@/components/Button/Button"
import BubbleDisplayImage from "@/components/BubbleDisplayImage/BubbleDisplayImage"
import ClipboardCopy from "@/components/ClipboardCopy/ClipboardCopy"

const AffinityHome = () => {
  const dispatch = useDispatch()
  const userData = useSelector(selectUser)
  const [userFriends, setUserFriends] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const { user } = useAuth()
  const { push } = useRouter()

  // Fetches user friends.
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      const fetchedData = await dispatch(
        fetchUserFriends(user, userData.userID)
      )

      setUserFriends(fetchedData?.userFriends || [])
      setIsLoading(false)
    }

    if (user && userData.userID) {
      fetchData()
    }
  }, [user, userData.userID])

  const buildShareURL = useCallback(() => {
    return window?.location?.origin + `/user/affinity/${userData.userID}`
  }, [userData.userID])

  const renderFriendRow = (friend) => {
    const { userID, userImageURL, userName } = friend

    return (
      <div key={userID} className="affinity-home__friends-list-item">
        <BubbleDisplayImage
          userImageURL={userImageURL}
          userName={userName}
          className="affinity-home__user-image-bubble"
          size={BubbleDisplayImage.MEDIUM}
        />
        <p className="affinity-home__user-name">{userName}</p>
        <div className="affinity-home__button-wrapper">
          <Button
            className="affinity-home__view-affinity-button"
            isSmall={true}
            type={Button.WARNING}
            onClick={() => push(`/user/affinity/${userID}`)}
          >
            View Affinity
          </Button>
        </div>
      </div>
    )
  }

  const renderMainContent = () => {
    if (isLoading) {
      return <Loader className="affinity-home__loader" size={Loader.LARGE} />
    } else {
      return (
        <main className="affinity-home__main-content">
          <section className="affinity-home__share-with-a-friend-wrapper">
            <h4 className="affinity-home__share-with-a-friend-title">
              Share Your Musical Journey with Others!
            </h4>
            <p className="affinity-home__share-with-a-friend-subtitle">
              Give this URL to a friend and explore your musical connection!
            </p>
            <ClipboardCopy
              className="affinity-home__url-clipboard-copy"
              text={buildShareURL()}
              type={ClipboardCopy.SUCCESS}
            />
          </section>
          <section className="affinity-home__friends-list-section">
            <h4 className="affinity-home__friends-list-heading">
              {userFriends.length === 0
                ? "Oops, it looks like you don't have friends yet... 😿"
                : "Your List of Friends"}
            </h4>
            {userFriends.map((friend) => renderFriendRow(friend))}
          </section>
        </main>
      )
    }
  }

  return (
    <div className="affinity-home">
      <Head>
        <title>Affinity Home</title>
      </Head>

      <header className="affinity-home__header">
        <h1 className="affinity-home__header-title">Affinity Home</h1>
      </header>

      {renderMainContent()}
    </div>
  )
}

export default AffinityHome
