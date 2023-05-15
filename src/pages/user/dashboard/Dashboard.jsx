import "./Dashboard.scss"

import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Head from "next/head"
import { faMusic, faPalette } from "@fortawesome/free-solid-svg-icons"

import { fetchStoredUserTopsStatus } from "@/redux/actions/userActions"
import DropdownBox from "@/components/DropdownBox/DropdownBox"
import UserTopInformation from "@/components/UserTopInformation/UserTopInformation"
import { useAuth } from "@/context/auth"
import { checkUserExist } from "@/redux/actions/authenticationActions"
import { selectTopsStatus, selectUser } from "@/redux/reducers/userReducer"

const Dashboard = () => {
  const dispatch = useDispatch()
  const userData = useSelector(selectUser)
  const topsStatus = useSelector(selectTopsStatus)
  const { user } = useAuth()

  useEffect(() => {
    if (user && userData.userID) {
      dispatch(checkUserExist(user, userData))
      dispatch(fetchStoredUserTopsStatus(user, userData.userID))
    }
  }, [user, userData.userID])

  return (
    <div className="dashboard">
      <Head>
        <title>Dashboard</title>
      </Head>

      <header className="dashboard__header">
        <h1 className="dashboard__header-title">Dashboard</h1>
      </header>
      <main className="dashboard__main-content">
        <DropdownBox
          defaultOpenState={false}
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
          defaultOpenState={false}
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
      </main>
    </div>
  )
}

export default Dashboard
