import "./DropdownBox.scss"

import React, { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons"

const DropdownBox = ({ title, className, icon, children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleHeaderButtonClick = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className={`dropdown-box ${className}`}>
      <button
        className="dropdown-box__header-button"
        onClick={handleHeaderButtonClick}
      >
        <h4 className="dropdown-box__title">
          {icon && (
            <FontAwesomeIcon
              className="dropdown-box__icon"
              icon={icon}
              size="xl"
            />
          )}
          {title}
          <FontAwesomeIcon
            className="dropdown-box__arrow-icon"
            icon={isOpen ? faChevronDown : faChevronUp}
            size="xl"
          />
        </h4>
      </button>
      <div
        className={`dropdown-box__content dropdown-box__content--is-${
          isOpen ? "shown" : "hidden"
        }`}
      >
        {children}
      </div>
    </div>
  )
}

export default DropdownBox
