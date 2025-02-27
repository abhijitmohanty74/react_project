import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Paper, TextField, Button, Typography, Box, Alert } from "@mui/material"
import GoogleIcon from "@mui/icons-material/Google"
import { useAuth } from "../contexts/AuthContext"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

  const { login, googleSignIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)

    try {
      await login(email, password)
      navigate("/dashboard")
    } catch (error) {
      console.error("Login failed:", error)
      setError("Login failed. Please try again.")
    }
  }

  const handleGoogleSignIn = async () => {
    setError(null)
    try {
      await googleSignIn()
      navigate("/dashboard")
    } catch (error) {
      console.error("Google sign-in failed:", error)
      setError("Google sign-in failed. Please try again.")
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              fullWidth
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              fullWidth
            />
            <Button type="submit" variant="contained" fullWidth size="large">
              Login
            </Button>
            <Button
              variant="outlined"
              fullWidth
              size="large"
              startIcon={<GoogleIcon />}
              onClick={handleGoogleSignIn}
            >
              Sign in with Google
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  )
}

export default Login
