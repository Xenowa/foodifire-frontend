import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import foodifire from "../resources/foodifire-text-logo-vertical.svg"
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import useFetch from '../auth/useFetch';
import { useEffect } from 'react';

export default function SignUpPage() {
  // Auth Checking
  const { handleGoogle } = useFetch("http://localhost:3000/login")

  useEffect(() => {
    // Initialize google auth features
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "474318000996-tmjrrbrumfh0ib11uoov7n68r4280026.apps.googleusercontent.com",
        callback: handleGoogle
      })
    }

    // Defining the sign in with google button properties
    window.google.accounts.id.renderButton(document.getElementById("signUpDiv"), {
      theme: "filled_blue",
      text: "continue_with",
      shape: "rectangle",
      size: "large"
    })
  }, [handleGoogle])

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "space-around", alignItems: "center", gap: "2rem" }}>
      <img src={foodifire} alt="React Image" />

      <Box sx={{ display: "flex", flexDirection: "column", gap: "3rem", minWidth: "15rem" }}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <TextField
            label="Username:"
            placeholder="Username"
            variant="standard" />

          <TextField
            label="Password:"
            placeholder="Password"
            variant="standard" />
          <TextField
            label="Confirm Password:"
            placeholder="Confirm Password"
            variant="standard" />
        </Box>

        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1rem" }}>
          <Button sx={{ fontWeight: "900", minWidth: "15rem" }} variant="contained" disabled>Continue</Button>
          <Typography variant="p" component="p">OR</Typography>
          <Link to="/home" style={{ textDecoration: "none" }}>
            <div id="signUpDiv"></div>
          </Link>

          <Typography variant="h5" component="h5">
            Already a member? <Link to="/signin" style={{ textDecoration: "none" }}><Typography
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
              Sign In
            </Typography>
            </Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}