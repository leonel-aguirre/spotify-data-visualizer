import "./Top.scss"

import React, { useEffect, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons"

import { useAuth } from "@/context/auth"
import { selectUser } from "@/redux/reducers/userReducer"
import { fetchUserTop } from "@/redux/actions/userActions"

const formatTimeRange = (timeRange) => {
  switch (timeRange) {
    case "short_term":
      return "Short Term"
    case "medium_term":
      return "Mid Term"
    case "long_term":
      return "Long Term"
    default:
      return ""
  }
}

// TODO: There must be a better way to do this lol.
const formatType = (type) => {
  switch (type) {
    case "artists":
      return "Artists"
    case "tracks":
      return "Tracks"
    default:
      return ""
  }
}

const getTimeText = (timeRange) => {
  switch (timeRange) {
    case "short_term":
      return "4 Weeks"
    case "medium_term":
      return "6 Months"
    case "long_term":
      return "Few Years"
    default:
      return ""
  }
}

const itemColors = [
  "top__data-item--is-blue",
  "top__data-item--is-red",
  "top__data-item--is-green",
  "top__data-item--is-yellow",
  "top__data-item--is-white",
  "top__data-item--is-purple",
]

let lastIndex = Math.floor(Math.random() * itemColors.length)

const Top = () => {
  const dispatch = useDispatch()
  const userData = useSelector(selectUser)
  const { user } = useAuth()
  const [topData, setTopData] = useState([])

  const {
    query: { type, timeRange },
    replace,
  } = useRouter()

  // useEffect(() => {
  //   if (!type && !timeRange) {
  //     replace("/user/dashboard")
  //   }
  // }, [type, timeRange])

  useEffect(() => {
    const fetchData = async () => {
      const data = await dispatch(
        fetchUserTop(user, userData.userID, type, timeRange)
      )

      if (data) {
        setTopData(data)
      } else {
        replace("/user/dashboard")
      }
    }

    if (user && userData.userID) {
      fetchData()
    }
  }, [user, userData.userID])

  const renderDataItem = (item) => {
    let colorIndex = Math.floor(Math.random() * itemColors.length)

    while (colorIndex === lastIndex) {
      colorIndex = Math.floor(Math.random() * itemColors.length)
    }

    lastIndex = colorIndex

    return (
      <div key={item} className={`top__data-item ${itemColors[colorIndex]}`}>
        {item}
      </div>
    )
  }

  const backButtonHandler = () => {
    replace("/user/dashboard")
  }

  return (
    <div className="top">
      <Head>
        <title>Top</title>
      </Head>

      <header className="top__header">
        <button className="top__back-button" onClick={backButtonHandler}>
          Back
        </button>
        <h1 className="top__header-title">
          Top {">"} {formatType(type)} {">"} {formatTimeRange(timeRange)}
        </h1>
      </header>
      <main className="top__main-content">
        <div className="top__description-container">
          <h2 className="top__description-title">
            {`Your ${formatTimeRange(timeRange)} Top ${formatType(type)}`}
          </h2>
          <p className="top__description-subtitle">{`(Last ${getTimeText(
            timeRange
          )})`}</p>
        </div>

        <div className="top__results-container">
          {topData?.map((item) => renderDataItem(item))}
        </div>
      </main>
    </div>
  )
}

export default Top
