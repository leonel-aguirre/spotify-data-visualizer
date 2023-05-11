/* eslint-disable @next/next/no-img-element */
import "./NavBar.scss"

import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"

import { fetchUserData } from "@/redux/actions/userActions"
import { selectImageURL, selectUserName } from "@/redux/reducers/userReducer"

const NavBar = () => {
  const dispatch = useDispatch()
  const userName = useSelector(selectUserName)
  const imageURL = useSelector(selectImageURL)

  useEffect(() => {
    dispatch(fetchUserData())
  }, [])

  return (
    <nav className="nav-bar">
      <div className="nav-bar__logo-and-title-wrapper">
        <img
          className="nav-bar__logo"
          src="/static/images/isotype.svg"
          alt="Nav bar Logo"
        />
      </div>
      <div className="nav-bar__user-bubble">
        <img className="nav-bar__bubble-user-image" src={imageURL} alt="" />
        <span className="nav-bar__bubble-user-name">{userName}</span>
      </div>
    </nav>
  )
}

export default NavBar
