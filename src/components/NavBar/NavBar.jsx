/* eslint-disable @next/next/no-img-element */
import "./NavBar.scss"

import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ArrowContainer, Popover } from "react-tiny-popover"
import { useRouter } from "next/router"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faCaretDown,
  faCaretUp,
  faChevronDown,
  faChevronUp,
} from "@fortawesome/free-solid-svg-icons"

import { fetchUserData } from "@/redux/actions/userActions"
import { selectUser } from "@/redux/reducers/userReducer"
import {
  logOut,
  setAfterSignInRedirectURL,
} from "@/redux/actions/authenticationActions"
import BubbleDisplayImage from "../BubbleDisplayImage/BubbleDisplayImage"

const NavBar = () => {
  const dispatch = useDispatch()
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
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

  return (
    <nav className="nav-bar">
      <div className="nav-bar__main-content">
        <div className="nav-bar__left-side-wrapper">
          <button className="nav-bar__logo-button" onClick={handleLogoButton}>
            <img
              className="nav-bar__logo"
              src="/static/images/isotype.svg"
              alt="Nav bar Logo"
            />
          </button>
          <ul className="nav-bar__menu-content">
            <li className="nav-bar__menu-option">
              <button
                className="nav-bar__menu-option-button"
                onClick={() => push("/user/dashboard")}
              >
                Dashboard
              </button>
            </li>
            <li className="nav-bar__menu-option">
              <button
                className="nav-bar__menu-option-button"
                onClick={() => push("/user/affinity")}
              >
                Affinity
              </button>
            </li>
          </ul>
        </div>
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
            <BubbleDisplayImage
              className="nav-bar__bubble-user-image"
              userImageURL={userImageURL}
              userName={userName}
              hasBorder={false}
              size={BubbleDisplayImage.SMALL}
            />
            <span className="nav-bar__bubble-user-name">{userName}</span>
            <FontAwesomeIcon
              className="nav-bar__caret-icon"
              icon={isPopoverOpen ? faCaretUp : faCaretDown}
            />
          </button>
        </Popover>
      </div>
      <div className="nav-bar__mobile-menu">
        <button
          className="nav-bar__mobile-menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <h4 className="nav-bar__mobile-menu-title">
            Menu
            <FontAwesomeIcon
              className="nav-bar__mobile-menu-arrow-icon"
              icon={isMenuOpen ? faChevronUp : faChevronDown}
              size="xl"
            />
          </h4>
        </button>
        {isMenuOpen && (
          <ul className="nav-bar__mobile-menu-content">
            <li className="nav-bar__mobile-menu-option">
              <button
                className="nav-bar__mobile-menu-option-button"
                onClick={() => push("/user/dashboard")}
              >
                Dashboard
              </button>
            </li>
            <li className="nav-bar__mobile-menu-option">
              <button
                className="nav-bar__mobile-menu-option-button"
                onClick={() => push("/user/affinity")}
              >
                Affinity
              </button>
            </li>
          </ul>
        )}
      </div>
    </nav>
  )
}

export default NavBar
