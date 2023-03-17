import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import foodifire from "../resources/foodifire-text-logo-horizontal.svg"

// ==
// JS
// ==


export default function Footer() {
    // ====
    // HTML
    // ====
    return (
        <AppBar position="static">
            <Toolbar sx={{ bgcolor: "secondary.main", boxShadow: "0 0 5px 0px var(--primary)", paddingY: "1rem" }}>
                <img style={styles.img} src={foodifire} alt="foodifire" />
                <Box sx={{ flexGrow: 1 }} />
                <Typography variant="p" color="primary">Bit Legion ©️ 2023</Typography>
            </Toolbar>
        </AppBar>
    );
}


// ===
// CSS
// ===
const styles = {
    img: {
        maxWidth: "10rem"
    }
}