import React from "react"

const TestPage = () => {
  const handleTestCookieButton = () => {
    fetch("/api/test-cookie")
  }
  return (
    <div className="test-page">
      <h1>TEST</h1>
      <button onClick={handleTestCookieButton}>Test Cookie</button>
    </div>
  )
}

export default TestPage
