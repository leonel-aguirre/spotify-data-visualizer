import "./UserTopInformation.scss"

import React from "react"
import { useRouter } from "next/router"

import Button from "../Button/Button"
import { jsonToQueryParams } from "@/utils"

const UserTopInformation = ({ data }) => {
  const { push } = useRouter()
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

  const handleCreateButton = () => {}

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
        >
          Create
        </Button>
      )
    }
  }

  return (
    <div className="user-top-information">
      <div className="user-top-information__type-status-wrapper">
        <p className="user-top-information__time-range">{timeRange}</p>
        <span
          className={`user-top-information__status user-top-information__status--is-${
            isCreated ? "created" : "not-created"
          }`}
        >
          {isCreated ? "CREATED" : "NOT CREATED"}
        </span>
      </div>
      <div className="user-top-information__action-buttons-container">
        <p className="user-top-information__actions-text">Actions:</p>
        {renderActionButtons()}
      </div>
    </div>
  )
}

export default UserTopInformation
