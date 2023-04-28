import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import foodifire from "../resources/foodifire-text-logo-vertical.svg"
import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import useFetch from '../auth/useFetch'

export default function SignInPage() {
  // Auth Checking
  const { handleGoogle } = useFetch(`${import.meta.env.VITE_API_BACKEND}/login`);

  // Initializing Google auth features
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
        callback: handleGoogle,
      });

      // Defining the Log In with google button properties
      window.google.accounts.id.renderButton(document.getElementById("loginDiv"), {
        theme: "filled_blue",
        text: "signin_with",
        shape: "rectangle",
        size: "large"
      });
    }
  }, [handleGoogle]);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center", gap: "2rem" }}>
      <img src={foodifire} alt="React Image" />

      <Box sx={{ display: "flex", flexDirection: "column", gap: "3rem", minWidth: "15rem" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TextField
            id="standard-required"
            label="Username:"
            placeholder="Username"
            variant="standard" />

          <TextField
            id="standard-required"
            label="Password:"
            placeholder="Password"
            variant="standard" />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <Button sx={{ fontWeight: "900", minWidth: "15rem" }} variant="contained" disabled>Sign in</Button>
          <Typography variant="p" component="p">OR</Typography>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <div id="loginDiv"></div>
          </Link>

          <Typography variant="h5" component="h5">
            New to Foodifire? <Link to="/" style={{ textDecoration: "none" }}><Typography
              sx={{
                textDecoration: "none",
                trnasition: "all 300ms ease-in-out",
                color: "primary.main",
                "&:hover": {
                  color: "primaryDark.main"
                }
              }}
              variant="span"
              component="span">
              Sign Up
            </Typography>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}