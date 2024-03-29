import "./Top.scss"

import React, { useEffect, useState } from "react"
import Head from "next/head"
import { useRouter } from "next/router"
import { useDispatch, useSelector } from "react-redux"

import { useAuth } from "@/context/auth"
import { selectUser } from "@/redux/reducers/userReducer"
import { fetchUserTop } from "@/redux/actions/userActions"
import PieChart from "@/components/PieChart/PieChart"
import Loader from "@/components/Loader/Loader"
import Button from "@/components/Button/Button"

const formatTimeRange = (timeRange) => {
  switch (timeRange) {
    case "short_term":
      return "Short Term"
    case "medium_term":
      return "Mid Term"
    case "long_term":
      return "Long Term"
    case "full_activity":
      return "Full Activity"
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
    case "genres":
      return "Genres"
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
    case "full_activity":
      return "Full Activity"
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
  const [isLoading, setIsLoading] = useState(true)

  const {
    query: { type, timeRange },
    replace,
  } = useRouter()

  const shouldRenderChart = type === "genres" && timeRange === "full_activity"

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)

      const data = await dispatch(
        fetchUserTop(user, userData.userID, type, timeRange)
      )

      if (data) {
        setTopData(data)

        setIsLoading(false)
      } else {
        replace("/user/dashboard")
      }
    }

    if (user && userData.userID) {
      fetchData()
    }
  }, [user, userData.userID])

  const renderDataItem = (item) => {
    const value = shouldRenderChart ? item?.genre : item

    let colorIndex = Math.floor(Math.random() * itemColors.length)

    while (colorIndex === lastIndex) {
      colorIndex = Math.floor(Math.random() * itemColors.length)
    }

    lastIndex = colorIndex

    return (
      <div key={value} className={`top__data-item ${itemColors[colorIndex]}`}>
        {value}
      </div>
    )
  }

  const backButtonHandler = () => {
    replace("/user/dashboard")
  }

  const renderResults = () => {
    if (shouldRenderChart) {
      return (
        <PieChart
          className="top__chart"
          labels={topData?.map((item) => item.genre)}
          data={topData?.map((item) => item.value)}
        />
      )
    }

    return <>{topData?.map((item) => renderDataItem(item))}</>
  }

  const renderMainContent = () => {
    if (isLoading) {
      return <Loader className="top__loader" size={Loader.LARGE} />
    } else {
      return (
        <main className="top__main-content">
          <div className="top__description-container">
            <h2 className="top__description-title">
              {`Your ${formatTimeRange(timeRange)} Top ${formatType(type)}`}
            </h2>
            {!shouldRenderChart && (
              <p className="top__description-subtitle">{`(Last ${getTimeText(
                timeRange
              )})`}</p>
            )}
          </div>

          <div className="top__results-container">{renderResults()}</div>
        </main>
      )
    }
  }

  return (
    <div className="top">
      <Head>
        <title>Top</title>
      </Head>

      <section className="top__back-button-section">
        <Button
          className="top__back-button"
          onClick={backButtonHandler}
          isSmall={true}
          type={Button.DEFAULT}
        >
          Back
        </Button>
      </section>

      <header className="top__header">
        <h1 className="top__header-title">
          Top {">"} {formatType(type)} {">"} {formatTimeRange(timeRange)}
        </h1>
      </header>

      {renderMainContent()}
    </div>
  )
}

export default Top
