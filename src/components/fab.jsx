import Fab from '@mui/material/Fab';

export default function ActionButton({ buttonSize, buttonText, buttonIcon, clickFunction }) {
    return (
        <Fab
            variant="extended"

            sx={buttonSize == "long" ? {
                width: "12rem",
                padding: "1.5rem 0rem",
                display: "flex",
                alignItems: "center",
                gap: "1rem",
                ":hover": {
                    bgcolor: "primaryDark.main"
                }
            } : {
                padding: "1.5rem 0.5rem",
            }}
            color="primary"
            onClick={clickFunction}
        >
            {buttonIcon}
            {buttonText}
        </Fab>
    )
}
