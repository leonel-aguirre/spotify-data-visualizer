import "./Compare.scss"

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"

import { useAuth } from "@/context/auth"
import { selectUser } from "@/redux/reducers/userReducer"
import { fetchFriendAffinityData } from "@/redux/actions/userActions"

const Compare = () => {
  const dispatch = useDispatch()
  const userData = useSelector(selectUser)
  const [affinityData, setAffinityData] = useState(null)

  const {
    query: { userID: userFriendID },
    replace,
  } = useRouter()
  const { user } = useAuth()

  useEffect(() => {
    const fetchAffinityData = async () => {
      const fetchedData = await dispatch(
        fetchFriendAffinityData(user, userData.userID, userFriendID)
      )
      setAffinityData(fetchedData)
    }

    if (user && userData.userID && userFriendID) {
      if (userData.userID === userFriendID) {
        replace("/user/dashboard")
      } else {
        fetchAffinityData()
      }
    }
  }, [user, userData.userID, userFriendID])

  return (
    <div className="compare">
      <pre>
        <code>{JSON.stringify(affinityData, null, 2)}</code>
      </pre>
    </div>
  )
}

export default Compare
