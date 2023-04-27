import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

const Login = () => {
  const [response, setResponse] = useState({})

  const {
    query: { code },
  } = useRouter()

  useEffect(() => {
    if (code) {
      fetch("/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
        }),
      })
        .then((response) => response.json())
        .then((data) => setResponse(data))
    }
  }, [code])

  const handleTestCookieButton = () => {
    fetch("/api/test-cookie")
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <pre>
        <code>{JSON.stringify(response, null, 2)}</code>
      </pre>
      <button onClick={handleTestCookieButton}>Test Cookie</button>
    </div>
  )
}

export default Login
