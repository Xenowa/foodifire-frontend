import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { ThemeProvider, createTheme } from '@mui/material/styles';

// Creating a custom theme
const darkTheme = createTheme({
  // Custom color palette
  palette: {
    mode: 'dark',
    primary: {
      main: "#FFBA00"
    },
    primaryDark: {
      main: "#B46617"
    },
    secondary: {
      main: "#08211d"
    },
    secondaryDark: {
      main: "#03110d"
    }
  },

  // Custom font sizes
  typography: {
    fontFamily: ["DM Sans", "sans-serif"].join(","),
    h1: {
      fontSize: "32px"
    },
    h2: {
      fontSize: "30px"
    },
    h3: {
      fontSize: "24px"
    },
    h4: {
      fontSize: "18px"
    },
    h5: {
      fontSize: "15px"
    },
    h6: {
      fontSize: "12px"
    },
    p: {
      fontSize: "12px"
    },
  },

  // Custom color for MUI paper
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: "var(--secondaryDark)",
        }
      }
    }
  }
});

// Rendering the app
ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={darkTheme}>
    <App />
  </ThemeProvider>,
)
