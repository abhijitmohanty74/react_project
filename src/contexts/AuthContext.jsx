import React, { createContext, useContext, useState, useEffect } from "react"

// Define the authentication context type
const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [user, setUser] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem("user")
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      setIsAuthenticated(true)
    }
  }, [])

  // Mock login function
  const login = async (email, password) => {
    if (email && password) {
      const mockUser = { id: 1, email }
      localStorage.setItem("user", JSON.stringify(mockUser))
      setUser(mockUser)
      setIsAuthenticated(true)
    }
  }

  // Mock Google sign-in function
  const googleSignIn = async () => {
    const mockUser = { id: 2, email: "google@example.com" }
    localStorage.setItem("user", JSON.stringify(mockUser))
    setUser(mockUser)
    setIsAuthenticated(true)
  }

  // Logout function
  const logout = () => {
    localStorage.removeItem("user")
    setUser(null)
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout, googleSignIn }}>
      {children}
    </AuthContext.Provider>
  )
}

// Custom hook to use the Auth context
export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
