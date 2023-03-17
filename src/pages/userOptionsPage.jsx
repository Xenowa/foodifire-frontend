import * as React from 'react';
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import LogoutIcon from '@mui/icons-material/Logout';
import ErrorIcon from '@mui/icons-material/Error';
import Button from '@mui/material/Button';
import { Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function UserOptionsPage({ userName, signOut }) {
  return (
    <Box sx={{ minHeight: "80vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: "1rem" }}>
      <PersonIcon color="secondary" sx={{ width: "5rem", minHeight: "5rem", bgcolor: "primary.main", borderRadius: "20rem", padding: "2.5rem" }} />
      <Typography variant="h1" component="h1">{userName}</Typography>


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
        disabled
      >
        Delete account
      </Button>
    </Box>
  )
}




