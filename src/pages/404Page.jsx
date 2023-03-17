import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import foodifire from "../resources/foodifire-logo.svg"


export default function NotFoundPage() {
    return (
        <Box sx={{ minHeight: "100vh", display: "flex", flexDirection: "column", gap: "2rem", alignItems: "center", justifyContent: "center" }}>
            <img src={foodifire} alt="foodifire-logo" />

            <Typography variant="h1" component="h1">404 Not Found!</Typography>

            <Link to="/home" style={{ textDecoration: "none", color: "#ffffff" }}>
                <Button variant="contained" color="primaryDark">Return to Home Page</Button>
            </Link>
        </Box>
    )
}
