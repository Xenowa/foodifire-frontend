import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Menu from '@mui/material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemIcon from '@mui/material/ListItemIcon';
import HomeIcon from '@mui/icons-material/Home';
import CoronavirusIcon from '@mui/icons-material/Coronavirus';
import EventNoteIcon from '@mui/icons-material/EventNote';
import StarIcon from '@mui/icons-material/Star';
import { useState } from 'react';
import { Link } from 'react-router-dom';


export default function Navbar() {
    const menuId = 'primary-search-account-menu';

    const [menuOpen, setMenuOpen] = useState(false);
    const [anchorElem, setAnchorElem] = useState(null);


    const handleClick = (event) => {
        setAnchorElem(event.currentTarget)
        setMenuOpen(true)
    }

    const handleClose = () => {
        setAnchorElem(null)
        setMenuOpen(false)
    }

    return (
        <AppBar position="sticky">
            <Toolbar sx={{ bgcolor: "secondary.main", boxShadow: "0 0 5px 0px var(--primary)", paddingY: "1rem" }}>
                <IconButton
                    size="large"
                    edge="start"
                    color="primary"
                    aria-label="open drawer"
                    sx={{ mr: 2 }}
                    onClick={handleClick}
                >
                    <MenuIcon />
                </IconButton>
                <Menu
                    anchorEl={anchorElem} // Set up element for menu to attach to
                    open={menuOpen}
                    onClose={handleClose}
                >
                    <Link to="/home" style={{ textDecoration: "none", color: "#ffffff" }}>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <HomeIcon sx={{ color: "primary.main" }} fontSize="medium" />
                            </ListItemIcon>

                            <ListItemText>
                                Home
                            </ListItemText>
                        </MenuItem>
                    </Link>
                    <Divider />
                    <Link to="/diseases" style={{ textDecoration: "none", color: "#ffffff" }}>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <CoronavirusIcon sx={{ color: "primary.main" }} fontSize="medium" />
                            </ListItemIcon>

                            <ListItemText>
                                Diseases
                            </ListItemText>
                        </MenuItem>
                    </Link>
                    <Divider />
                    <Link to="/reports" style={{ textDecoration: "none", color: "#ffffff" }}>
                        <MenuItem onClick={handleClose}>
                            <ListItemIcon>
                                <EventNoteIcon sx={{ color: "primary.main" }} fontSize="medium" />
                            </ListItemIcon>

                            <ListItemText>
                                Reports
                            </ListItemText>
                        </MenuItem>
                    </Link>
                    <Divider />
                    <MenuItem onClick={handleClose} disabled>
                        <ListItemIcon>
                            <StarIcon sx={{ color: "primary.main" }} fontSize="medium" />
                        </ListItemIcon>
                        <ListItemText>
                            recommendations
                        </ListItemText>
                    </MenuItem>
                </Menu>
                <Box sx={{ flexGrow: 1 }} />
                <Link to="/options" style={{ textDecoration: "none", color: "#ffffff" }}>
                    <IconButton
                        size="large"
                        edge="end"
                        aria-label="account of current user"
                        aria-controls={menuId}
                        aria-haspopup="true"
                        color="primary"
                    >
                        <PersonIcon />
                    </IconButton>
                </Link>
            </Toolbar>
        </AppBar>
    );
}