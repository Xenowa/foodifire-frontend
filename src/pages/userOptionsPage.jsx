import * as React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LogoutIcon from '@mui/icons-material/Logout';
import ErrorIcon from '@mui/icons-material/Error';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function UserOptionsPage({ user, signOut }) {
  function deleteAccount() {
    // send delete request
    fetch(`${import.meta.env.VITE_API_BACKEND}/user`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userToken: user?.token,
        userEmail: user?.email
      })
    }).then(async (data) => {
      console.log(data)
      const results = await data.json()

      if (data.status !== 200) {
        console.log(results)
        return
      }

      // remove user from localStorage
      console.log(results)
      signOut()
    }).catch((err) => {
      console.log(err)
    })
  }

  return (
    <Box sx={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
      {/* Display User Logo if exists else a general logo */}
      {user.picture ? <img src={user.picture} /> :
        <PersonIcon color="secondary" sx={{ width: "5rem", minHeight: "5rem", bgcolor: "primary.main", borderRadius: "20rem", padding: "2.5rem" }} />
      }

      <Typography variant="h1" component="h1">{user.firstName + " " + user.lastName}</Typography>


      <Link to="/home" style={{ textDecoration: "none", color: "#ffffff" }}>
        <Button
          color="success"
          variant="contained"
          startIcon={<ArrowBackIosNewIcon />}
          sx={{ width: "15rem", fontWeight: "900" }}>
          Go back
        </Button>
      </Link>

      <Link to="/" style={{ textDecoration: "none", color: "#ffffff" }} onClick={signOut}>
        <Button
          variant="contained"
          startIcon={<LogoutIcon />}
          sx={{ fontWeight: "900", width: "15rem" }}>
          Sign out
        </Button>
      </Link>

      <Button
        variant="contained"
        color="error"
        startIcon={<ErrorIcon />}
        sx={{ fontWeight: "900", width: "15rem" }}
        onClick={deleteAccount}
      >
        Delete account
      </Button>
    </Box>
  )
}




