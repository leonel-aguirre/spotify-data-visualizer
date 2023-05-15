import "./UserTopInformation.scss"

import React, { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from "next/router"

import { jsonToQueryParams } from "@/utils"
import { createTop } from "@/redux/actions/userActions"
import { useAuth } from "@/context/auth"
import { selectUser } from "@/redux/reducers/userReducer"
import Button from "../Button/Button"
import Loader from "../Loader/Loader"

const getLabel = (timeRange) => {
  switch (timeRange) {
    case "short_term":
      return "Short Term"
    case "medium_term":
      return "Mid Term"
    case "long_term":
      return "Long Term"
  }
}

const UserTopInformation = ({ data }) => {
  const dispatch = useDispatch()
  const userData = useSelector(selectUser)
  const { push } = useRouter()
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const { type, isCreated, timeRange } = data

  const handleViewButton = () => {
    push(
      "/user/top?" +
        jsonToQueryParams({
          type,
          timeRange,
        })
    )
  }

  const handleCreateButton = async () => {
    setIsLoading(true)
    await dispatch(createTop(user, userData.userID, type, timeRange))
    setIsLoading(false)
  }

  const renderActionButtons = () => {
    if (isCreated) {
      return (
        <>
          <Button
            className="user-top-information__action-button"
            type={Button.DEFAULT}
            isSmall={true}
            onClick={handleViewButton}
          >
            View
          </Button>
          <Button
            className="user-top-information__action-button"
            type={Button.DEFAULT}
            isSmall={true}
            onClick={handleCreateButton}
          >
            Create
          </Button>
        </>
      )
    } else {
      return (
        <Button
          className="user-top-information__action-button"
          type={Button.SUCCESS}
          isSmall={true}
          onClick={handleCreateButton}
        >
          Create
        </Button>
      )
    }
  }

  const renderStatus = () => {
    if (!isLoading) {
      return (
        <span
          className={`user-top-information__status user-top-information__status--is-${
            isCreated ? "created" : "not-created"
          }`}
        >
          {isCreated ? "CREATED" : "NOT CREATED"}
        </span>
      )
    }

    return (
      <Loader size={Loader.SMALL} className="user-top-information__loader" />
    )
  }

  return (
    <div className="user-top-information">
      <div className="user-top-information__type-status-wrapper">
        <p className="user-top-information__time-range">
          {getLabel(timeRange)}
        </p>
        {renderStatus()}
      </div>
      <div className="user-top-information__action-buttons-container">
        <p className="user-top-information__actions-text">Actions:</p>
        {renderActionButtons()}
      </div>
    </div>
  )
}

export default UserTopInformation
