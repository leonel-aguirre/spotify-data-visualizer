import React from "react"
import { useRouter } from "next/router"

import NavBar from "@/components/NavBar/NavBar"

const AfterLoginLayout = ({ children }) => {
  const { route } = useRouter()

  const isAfterUserRoute = `${route}/`.includes("/user/")

  return (
    <>
      {isAfterUserRoute && <NavBar />}
      {children}
    </>
  )
}

export default AfterLoginLayout
