import Container from "@mui/material/Container"
import Box from "@mui/material/Box"
import ActionButton from "../components/fab"
import LoopIcon from '@mui/icons-material/Loop';
import CameraIcon from '@mui/icons-material/Camera';
import { useRef, useState } from "react";
import Report from "../components/report"

export default function HomePage({ user, diseases, addReport }) {
    // ==
    // JS
    // ==
    const [showReport, setShowreport] = useState(false)
    const [prediction, setPrediction] = useState({})

    // camera stream video element
    const cameraInput = useRef();

    // default user media options
    let constraints = { audio: false, video: true }
    let shouldFaceUser = true;

    let stream = null;

    function capture() {
        constraints.video = {
            width: {
                min: 192,
                ideal: 192,
                max: 192,
            },
            height: {
                min: 192,
                ideal: 192,
                max: 192
            },
            facingMode: shouldFaceUser ? 'user' : 'environment'
        }
        navigator.mediaDevices.getUserMedia(constraints)
            .then(function (mediaStream) {
                stream = mediaStream;
                cameraInput.current.srcObject = stream;
                cameraInput.current.setAttribute("autoplay", true)
                // cameraInput.current.play();
            })
            .catch(function (err) {
                console.log(err)
            });
    }

    // Running the capture function only if report is not shown
    if (!showReport) {
        capture();
    }

    function flipCamera() {
        if (stream == null) return
        // we need to flip, stop everything
        stream.getTracks().forEach(t => {
            t.stop();
        });
        // toggle / flip
        shouldFaceUser = !shouldFaceUser;
        capture();
    }

    async function takePhoto() {
        // create a canvas
        const tempCanvas = document.createElement("canvas")
        tempCanvas.width = 192
        tempCanvas.height = 192
        // get 2d context of the canvas
        const context = tempCanvas.getContext("2d")

        // draw the image on the canvas
        context.drawImage(cameraInput.current, 0, 0, tempCanvas.width, tempCanvas.height)

        // get the current canvas data as url
        const dataUrl = tempCanvas.toDataURL("image/jpeg")

        // send results
        const result = await fetch(`${import.meta.env.VITE_API_BACKEND}/getReport`, {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                image: dataUrl,
                userToken: user?.token
            })
        }).then((res) => {
            return res.json()
        }).then((data) => {
            return data
        })

        console.log(result)

        setShowreport(true)
        setPrediction({
            foodImage: dataUrl,
            results: result
        })
    }

    function closeReport() {
        setShowreport(false)
    }

    // ====
    // HTML
    // ====
    return (
        <div>
            {showReport ?

                <Report diseases={diseases} prediction={prediction} closeReport={closeReport} addReport={addReport} user={user} /> :

                <Container maxWidth="xxl" sx={{ marginBottom: "2rem" }}>
                    <video ref={cameraInput} style={styles.cameraStyles}></video>

                    <Box display="flex" flexDirection="column" alignItems="flex-end" gap="1rem">
                        <ActionButton buttonSize="long" buttonText="Flip Camera" buttonIcon={<LoopIcon />} clickFunction={flipCamera} />
                        <ActionButton buttonSize="long" buttonText="Take Photo" buttonIcon={<CameraIcon />} clickFunction={takePhoto} />
                    </Box>
                </Container>
            }
        </div>
    )
}

// ===
// CSS
// ===
const styles = {
    cameraStyles: {
        background: "var(--secondary)",
        maxWidth: "20rem",
        height: "20rem",
        borderRadius: "0.5rem",
        display: "block",
        margin: "10rem auto"
    }
}