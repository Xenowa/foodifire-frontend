import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import ActionButton from "../components/fab"
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react"
import DiseaseInput from "../components/diseaseInput"

export default function DiseasesPage({ user, diseases, addDisease, removeDisease }) {
    // ==
    // JS
    // ==
    const [showDiseases, setShowDiseases] = useState(true)

    function toggleDiseases() {
        setShowDiseases(!showDiseases)
    }

    function addCondition(disease) {
        // Add disease to the DB
        fetch("http://localhost:3000/disease", {
            method: "POST",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify({
                userToken: user.token,
                userEmail: user.email,
                condition: disease
            })
        }).then(async (data) => {
            const result = await data.json()

            // handle error response
            if (data.status !== 200) {
                console.log(result)
                return
            }

            // set the state if successful
            console.log(result)
            addDisease(disease)
            setShowDiseases(true)
        }).catch((err) => {
            console.log(err)
        })
    }

    function removeCondition(disease) {
        // Remove disease from the DB
        fetch("http://localhost:3000/disease", {
            method: "DELETE",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify({
                userToken: user.token,
                userEmail: user.email,
                condition: disease
            })
        }).then(async (data) => {
            const result = await data.json()

            // handle error response
            if (data.status !== 200) {
                console.log(result)
                return
            }

            // set the state if successful
            console.log(result)
            removeDisease(disease)
        }).catch((err) => {
            console.log(err)
        })
    }

    // ====
    // HTML
    // ====
    return (
        <div>
            <Typography variant="h1" align="center" margin="1rem 0">
                My Diseases
            </Typography>

            {showDiseases ?
                <Container maxWidth="xxl" sx={{ marginBottom: "2rem" }}>

                    <Box display="flex" flexDirection="column" alignItems="center" gap="1rem" margin="1rem 0" minHeight="63vh">
                        {diseases.map((disease) => {

                            return (
                                <Card key={"KEY-" + disease} sx={{ width: "25rem", '@media (max-width: 432px)': { width: "15rem" }, bgcolor: "secondary.main", display: "flex", justifyContent: "space-around", alignItems: "center", padding: "1rem" }}>
                                    {/* Uppercase the disease first letter */}
                                    <Typography variant="h3">{disease.charAt(0).toUpperCase() + disease.slice(1)}</Typography>
                                    <Box sx={{ flexGrow: 1 }} />
                                    <IconButton data-condition={disease} onClick={(e) => removeCondition(e.currentTarget.dataset.condition)}>
                                        <DeleteOutlineIcon sx={{ color: "error.main" }} fontSize="medium" />
                                    </IconButton>
                                </Card>
                            )
                        })}
                    </Box>

                    <Box display="flex" flexDirection="column" alignItems="flex-end">
                        <ActionButton buttonIcon={<AddIcon fontSize="medium" />} clickFunction={toggleDiseases} />
                    </Box>
                </Container> :
                <DiseaseInput acceptFunction={addCondition} closeFunction={toggleDiseases} />
            }
        </div >
    )
}

// ===
// CSS
// ===
