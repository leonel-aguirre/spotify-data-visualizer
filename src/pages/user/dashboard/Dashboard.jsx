import "./Dashboard.scss"

import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import Head from "next/head"
import { faMusic, faPalette } from "@fortawesome/free-solid-svg-icons"

import {
  databaseTest,
  fetchUserLongTermTopArtists,
} from "@/redux/actions/userActions"
import DropdownBox from "@/components/DropdownBox/DropdownBox"
import UserTopInformation from "@/components/UserTopInformation/UserTopInformation"
import { useAuth } from "@/context/auth"

const Dashboard = () => {
  const dispatch = useDispatch()
  const { user } = useAuth()

  useEffect(() => {
    // dispatch(fetchUserLongTermTopArtists())

    if (user) {
      dispatch(databaseTest(user))
    }
  }, [user])

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
          className="dashboard__dropdown-box"
          title={"Your Top Artists"}
          icon={faPalette}
        >
          <UserTopInformation
            data={{ type: "artist", timeRange: "Short Term", isCreated: true }}
          />
          <UserTopInformation
            data={{ type: "artist", timeRange: "Mid Term", isCreated: false }}
          />
          <UserTopInformation
            data={{ type: "artist", timeRange: "Long Term", isCreated: false }}
          />
        </DropdownBox>
        <DropdownBox
          className="dashboard__dropdown-box"
          title={"Your Top Tracks"}
          icon={faMusic}
        >
          <UserTopInformation
            data={{ type: "track", timeRange: "Short Term", isCreated: false }}
          />
          <UserTopInformation
            data={{ type: "track", timeRange: "Mid Term", isCreated: true }}
          />
          <UserTopInformation
            data={{ type: "track", timeRange: "Long Term", isCreated: true }}
          />
        </DropdownBox>
      </main>
    </div>
  )
}

export default Dashboard
