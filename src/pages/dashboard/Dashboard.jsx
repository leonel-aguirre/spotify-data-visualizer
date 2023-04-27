import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { fetchUserData } from "@/redux/actions/userActions"
import { selectImageURL, selectUserName } from "@/redux/reducers/userReducer"

const Dashboard = () => {
  const dispatch = useDispatch()
  const userName = useSelector(selectUserName)
  const imageURL = useSelector(selectImageURL)

  useEffect(() => {
    dispatch(fetchUserData())
  }, [])

  return (
    <div className="dashboard">
      <h1>Dashboard</h1>
      <h2>{userName}</h2>
      {/* <img src={imageURL} alt="" /> */}
    </div>
  )
}

export default Dashboard
