import "./Dashboard.scss"

import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Head from "next/head"

import {
  fetchUserData,
  fetchUserLongTermTopArtists,
} from "@/redux/actions/userActions"
import { selectImageURL, selectUserName } from "@/redux/reducers/userReducer"
import PieChart from "@/components/PieChart/PieChart"

const Dashboard = () => {
  const dispatch = useDispatch()
  const userName = useSelector(selectUserName)
  const imageURL = useSelector(selectImageURL)

  useEffect(() => {
    dispatch(fetchUserData())
    dispatch(fetchUserLongTermTopArtists())
  }, [])

  return (
    <div className="dashboard">
      <Head>
        <title>Dashboard</title>
      </Head>

      <h1>Dashboard</h1>
      <h2>{userName}</h2>
      {/* <img src={imageURL} alt="" /> */}

      {/* <PieChart /> */}
    </div>
  )
}

export default Dashboard
