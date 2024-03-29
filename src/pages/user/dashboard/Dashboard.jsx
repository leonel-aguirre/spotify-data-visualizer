import "./Dashboard.scss"

import React, { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Head from "next/head"
import { faMusic, faPalette, faStar } from "@fortawesome/free-solid-svg-icons"

import DropdownBox from "@/components/DropdownBox/DropdownBox"
import UserTopInformation from "@/components/UserTopInformation/UserTopInformation"
import ClipboardCopy from "@/components/ClipboardCopy/ClipboardCopy"
import { useAuth } from "@/context/auth"
import { fetchStoredUserTopsStatus } from "@/redux/actions/userActions"
import { checkUserExist } from "@/redux/actions/authenticationActions"
import { selectTopsStatus, selectUser } from "@/redux/reducers/userReducer"
import { hasAtLeastOneTop } from "@/utils"
import Loader from "@/components/Loader/Loader"

const Dashboard = () => {
  const dispatch = useDispatch()
  const userData = useSelector(selectUser)
  const topsStatus = useSelector(selectTopsStatus)
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      await dispatch(checkUserExist(user, userData))
      await dispatch(fetchStoredUserTopsStatus(user, userData.userID))

      setIsLoading(false)
    }

    if (user && userData.userID) {
      fetchData()
    }
  }, [user, userData.userID])

  const buildShareURL = useCallback(() => {
    return window?.location?.origin + `/user/affinity/${userData.userID}`
  }, [userData.userID])

  const renderMainContent = () => {
    if (isLoading) {
      return <Loader className="dashboard__loader" size={Loader.LARGE} />
    } else {
      return (
        <main className="dashboard__main-content">
          {hasAtLeastOneTop(topsStatus) && (
            <div className="dashboard__share-with-a-friend-wrapper">
              <h4 className="dashboard__share-with-a-friend-title">
                Share Your Musical Journey with Others!
              </h4>
              <p className="dashboard__share-with-a-friend-subtitle">
                Give this URL to a friend and explore your musical connection!
              </p>
              <ClipboardCopy
                className="dashboard__url-clipboard-copy"
                text={buildShareURL()}
                type={ClipboardCopy.SUCCESS}
              />
            </div>
          )}
          <DropdownBox
            defaultOpenState={true}
            className="dashboard__dropdown-box"
            title={"Your Top Artists"}
            icon={faPalette}
          >
            <UserTopInformation
              data={{
                type: "artists",
                timeRange: "short_term",
                isCreated: topsStatus.artistShortTerm,
              }}
            />
            <UserTopInformation
              data={{
                type: "artists",
                timeRange: "medium_term",
                isCreated: topsStatus.artistMidTerm,
              }}
            />
            <UserTopInformation
              data={{
                type: "artists",
                timeRange: "long_term",
                isCreated: topsStatus.artistLongTerm,
              }}
            />
          </DropdownBox>
          <DropdownBox
            defaultOpenState={true}
            className="dashboard__dropdown-box"
            title={"Your Top Tracks"}
            icon={faMusic}
          >
            <UserTopInformation
              data={{
                type: "tracks",
                timeRange: "short_term",
                isCreated: topsStatus.trackShortTerm,
              }}
            />
            <UserTopInformation
              data={{
                type: "tracks",
                timeRange: "medium_term",
                isCreated: topsStatus.trackMidTerm,
              }}
            />
            <UserTopInformation
              data={{
                type: "tracks",
                timeRange: "long_term",
                isCreated: topsStatus.trackLongTerm,
              }}
            />
          </DropdownBox>
          <DropdownBox
            defaultOpenState={true}
            className="dashboard__dropdown-box"
            title={"Your Top Genres"}
            icon={faStar}
          >
            <UserTopInformation
              data={{
                type: "genres",
                timeRange: "full_activity",
                isCreated: topsStatus.genreFullActivity,
              }}
            />
          </DropdownBox>
        </main>
      )
    }
  }

  return (
    <div className="dashboard">
      <Head>
        <title>Dashboard</title>
      </Head>

      <header className="dashboard__header">
        <h1 className="dashboard__header-title">Dashboard</h1>
      </header>
      {renderMainContent()}
    </div>
  )
}

export default Dashboard
