import Container from "@mui/material/Container"
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

export default function ReportsPage({ diseases, reports }) {
    // ==
    // JS
    // ==


    // ====
    // HTML
    // ====
    return (
        <div>
            <Typography variant="h1" component="h1" textAlign="center" marginTop="2rem">My Reports</Typography>

            <Container maxWidth="xxl" sx={{ margin: "1rem 0", display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", justifyContent: "center", minHeight: "75vh" }}>
                {reports.map((report, reportNumber) => {
                    // Check if diseases given by the user matches with the diseases in the food report
                    const match = diseases.some(disease => report.associatedDiseases.includes(disease))

                    return (
                        <Card key={"KEY-" + report.foodSource} sx={{ display: 'flex', width: "20rem", bgcolor: "secondary.main" }}>
                            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: "center", padding: "2rem 0", width: "60%" }}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="h3" variant="h3">
                                        {report.foodSource}
                                    </Typography>

                                    <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "center" }}>
                                        <Typography variant="h5" color="text.secondary" component="h5">
                                            Report {reportNumber + 1}
                                        </Typography>
                                        <IconButton disabled={true}>
                                            {
                                                match ? <ErrorOutlineIcon sx={{ color: "error.main" }} /> :
                                                    <TaskAltIcon sx={{ color: "success.main" }} />
                                            }
                                        </IconButton>
                                    </Box>
                                </CardContent>

                                <Button variant="contained" sx={{ fontWeight: "900", width: "fit-content" }} disabled>View Report</Button>
                            </Box>

                            <CardMedia
                                component="img"
                                sx={{ width: "40%", bgcolor: "primary.main", objectFit: "cover" }}
                                image={report.imgURL}
                                alt="Food item"
                            />
                        </Card>
                    )
                })}
            </Container>
        </div>
    )
}

// ===
// CSS
// ===
