import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Container, Paper, TextField, Button, Typography, Box } from "@mui/material"
import GoogleIcon from "@mui/icons-material/Google"
import { useAuth } from "../contexts/AuthContext"

const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { login, googleSignIn } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await login(email, password)
      navigate("/")
    } catch (error) {
      console.error("Login failed:", error)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn()
      navigate("/dashboard")
    } catch (error) {
      console.error("Google sign-in failed:", error)
    }
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Login
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box display="flex" flexDirection="column" gap={2}>
            <TextField
              label="Email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <TextField
              label="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="contained" fullWidth>
              Login
            </Button>
            <Button
              variant="outlined"
              fullWidth
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
