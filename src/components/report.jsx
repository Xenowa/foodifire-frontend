import Button from '@mui/material/Button';
import ModeEditOutlineOutlinedIcon from '@mui/icons-material/ModeEditOutlineOutlined';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function Report({ diseases, prediction, closeReport, addReport, user }) {
    // Destructuring prediction results
    const foodImageURL = prediction.foodImage || ""
    const predictedFoodName = prediction.results.foodName || ""
    const predictedDiseases = prediction.results.relatedConditions || []
    const dbMessage = prediction.results.message || ""
    let consumable = true

    // If at least 1 predicted disease matches with an users disease conditions
    // if (predictedDiseases.some((predictedDisease) => diseases.includes(predictedDisease))) {
    if (diseases.some((disease) => predictedDiseases.includes(disease.toLowerCase()))) {
        // set consumable to false
        consumable = false
    }

    // ================
    // Report Functions
    // ================
    function saveReport() {
        // Create report object
        const report = {
            reportID: Date.now(),
            foodSource: predictedFoodName,
            associatedDiseases: predictedDiseases,
            imgURL: foodImageURL
        }

        // save report to DB
        fetch(`${import.meta.env.VITE_API_BACKEND}/report`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userToken: user?.token,
                userEmail: user?.email,
                report: report
            })
        }).then(async (data) => {
            const result = await data.json()

            if (data.status !== 200) {
                console.log(result)
                return
            }

            // save report in localstorage
            console.log(result)
            addReport(report)
            closeReport()
        }).catch((err) => {
            console.log(err)
        })

    }


    return (
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "2rem",
            bgcolor: "secondary.main",
            maxWidth: "25rem",
            borderRadius: "0.5rem",
            margin: "1rem auto"
        }}>

            <img src={foodImageURL} alt="Food item" style={{ width: "100%", height: "20rem", objectFit: "cover", borderRadius: "0.5rem 0.5rem  0 0" }} />

            <Box sx={{ width: "100%", display: "flex", justifyContent: "space-around", alignItems: "center", gap: "10rem" }}>
                <Typography variant='h4'>{predictedFoodName}</Typography>
                <IconButton disabled>
                    <ModeEditOutlineOutlinedIcon color="primary" />
                </IconButton>
            </Box>

            {/* Check if there is a database error */}
            {dbMessage === "Error!, Database not functional!" ?
                <Typography variant="h1" component="h1" color="error" textAlign="center">{dbMessage}</Typography> :
                // If no DB Error proceed to display the rest of the disease data
                <>
                    <Box sx={{ width: "80%", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(8rem, 1fr))", gap: "0.5rem" }}>
                        {diseases.map((disease) => {
                            return (
                                <Chip
                                    key={"KEY-" + disease}
                                    label={disease.charAt(0).toUpperCase() + disease.slice(1)}
                                    variant="contained"
                                    color={predictedDiseases.includes(disease.toLowerCase()) ? "error" : "success"}
                                />
                            )
                        })}
                    </Box>

                    {consumable ?

                        <Alert severity="success" variant="outlined">
                            <AlertTitle>Safe</AlertTitle>
                            <Typography variant="h5" component="h5">The Food is safe for consuming</Typography>
                        </Alert> :

                        <Alert severity="error" variant="outlined">
                            <AlertTitle>Unsafe</AlertTitle>
                            <Typography variant="h5" component="h5">The Food is not safe for consuming</Typography>
                        </Alert>
                    }
                </>
            }

            <Box sx={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
                <Button variant="contained" sx={{ fontWeight: "bold" }} onClick={saveReport}>Save</Button>
                <Button variant="contained" sx={{ fontWeight: "bold" }} onClick={closeReport}>Close</Button>
            </Box>
        </Box >
    )
}