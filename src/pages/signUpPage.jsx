import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Google from '@mui/icons-material/Google';
import foodifire from "../resources/foodifire-text-logo-vertical.svg"
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function SignUpPage({ authorize }) {
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
          <Link to="/home" style={{ textDecoration: "none" }} onClick={authorize}>
            <Button sx={{ fontWeight: "900", minWidth: "15rem" }} startIcon={<Google />} color="info" variant="contained">Continue with google</Button>
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