/* eslint-disable @next/next/no-img-element */
import "./NavBar.scss"

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ArrowContainer, Popover } from "react-tiny-popover"
import { useRouter } from "next/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCaretDown, faCaretUp } from "@fortawesome/free-solid-svg-icons"

import { fetchUserData } from "@/redux/actions/userActions"
import { selectUser } from "@/redux/reducers/userReducer"
import {
  logOut,
  setAfterSignInRedirectURL,
} from "@/redux/actions/authenticationActions"

const NavBar = () => {
  const dispatch = useDispatch()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const userData = useSelector(selectUser)
  const { replace, push } = useRouter()
  const { userName, userImageURL } = userData

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchUserData())
      } catch {
        if (window?.location?.pathname.includes("/user/affinity/")) {
          dispatch(setAfterSignInRedirectURL(window?.location?.pathname))
        }

        replace("/")
      }
    }

    fetchData()
  }, [])

  const handleLogOutButton = async () => {
    setIsPopoverOpen(!isPopoverOpen)
    await dispatch(logOut())
    replace("/")
  }

  const handleLogoButton = () => {
    push("/user/dashboard")
  }

  const renderDisplayImage = () => {
    if (userImageURL) {
      return (
        <img className="nav-bar__bubble-user-image" src={userImageURL} alt="" />
      )
    } else {
      return (
        <div className="nav-bar__bubble-user-image">{userName.charAt(0)}</div>
      )
    }
  }

  return (
    <nav className="nav-bar">
      <button className="nav-bar__logo-button" onClick={handleLogoButton}>
        <img
          className="nav-bar__logo"
          src="/static/images/isotype.svg"
          alt="Nav bar Logo"
        />
      </button>
      <Popover
        isOpen={isPopoverOpen}
        containerClassName="nav-bar__popover"
        positions={["bottom"]}
        padding={25}
        content={({ position, childRect, popoverRect }) => (
          <ArrowContainer
            position={position}
            childRect={childRect}
            popoverRect={popoverRect}
            arrowColor={"blue"}
            arrowSize={10}
            arrowClassName="nav-bar__popover-arrow"
          >
            <button
              className="nav-bar__popover-log-out-button"
              onClick={handleLogOutButton}
            >
              Log Out
            </button>
          </ArrowContainer>
        )}
      >
        <button
          className="nav-bar__user-bubble-button"
          onClick={() => setIsPopoverOpen(!isPopoverOpen)}
        >
          {renderDisplayImage()}
          <span className="nav-bar__bubble-user-name">{userName}</span>
          <FontAwesomeIcon
            className="nav-bar__caret-icon"
            icon={isPopoverOpen ? faCaretUp : faCaretDown}
          />
        </button>
      </Popover>
    </nav>
  )
}

export default NavBar
