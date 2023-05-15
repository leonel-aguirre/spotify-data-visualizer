import "./Loader.scss"

import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faSpinner } from "@fortawesome/free-solid-svg-icons"

const Loader = ({ size = Loader.MEDIUM, className = "" }) => {
  return (
    <div className={`loader ${className} ${size}`}>
      <FontAwesomeIcon className="loader__icon" icon={faSpinner} spinPulse />
    </div>
  )
}

Loader.SMALL = "loader--is-small"
Loader.MEDIUM = "loader--is-medium"
Loader.LARGE = "loader--is-large"

export default Loader
