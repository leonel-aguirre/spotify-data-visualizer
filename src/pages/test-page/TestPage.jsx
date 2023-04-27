import React from "react"

import { get } from "@/axios/api"

const TestPage = () => {
  const handleTestCookieButton = () => {
    get("/api/test-cookie")
  }

  return (
    <div className="test-page">
      <h1>TEST</h1>
      <button onClick={handleTestCookieButton}>Test Cookie</button>
    </div>
  )
}

export default TestPage
