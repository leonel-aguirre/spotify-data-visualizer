import React, { useState, useEffect, useContext, createContext } from "react"
import { onAuthStateChanged } from "firebase/auth"

import { auth } from "@/firebase-client"

const authContext = createContext()

export const AuthProvider = ({ children }) => {
  const firebaseAuth = useFirebaseAuth()
  return (
    <authContext.Provider value={firebaseAuth}>{children}</authContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(authContext)
}

export const useFirebaseAuth = () => {
  const [user, setUser] = useState(null)

  const handleUser = (user) => {
    if (user) {
      setUser(user)
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleUser)
    return () => unsubscribe()
  }, [])

  return { user }
}
