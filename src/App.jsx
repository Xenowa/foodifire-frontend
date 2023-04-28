import './App.css'
import HomePage from './pages/homePage'
import DiseasesPage from './pages/diseasesPage'
import ReportsPage from './pages/reportsPage'
import SignInPage from './pages/signInPage'
import SignUpPage from './pages/signUpPage'
import { HashRouter, Navigate, Route, Routes } from "react-router-dom"
import { Typography } from '@mui/material'
import ProtectedRoutes from './auth/protectedRoutes'
import { useEffect, useState } from 'react'
import UserOptionsPage from './pages/userOptionsPage'
import NotFoundPage from './pages/404Page'

export default function App() {
  // ==
  // JS
  // ==
  // =================
  // User Disease Data
  // =================
  // Create local storage array if not exists
  if (!localStorage.getItem("userDiseases")) {
    localStorage.setItem("userDiseases", JSON.stringify([]))
  }

  // store the local storage data in a state array
  const [diseases, setDiseases] = useState(JSON.parse(localStorage.getItem("userDiseases")))

  // Remove a disease from state
  function removeDisease(diseaseName) {
    setDiseases(diseases.filter((disease) => {
      return disease !== diseaseName
    }))
  }

  // Add a disease to state
  function addDisease(diseaseName) {
    let tempDiseaseArray = [...diseases]
    tempDiseaseArray.push(diseaseName)
    setDiseases(tempDiseaseArray)
  }

  // Update the local storage on state change with current updated state
  useEffect(() => {
    localStorage.setItem("userDiseases", JSON.stringify(diseases))
  }, [diseases])

  // =================
  // User Reports Data
  // =================
  // Create local storage array if not exists
  if (!localStorage.getItem("userReports")) {
    localStorage.setItem("userReports", JSON.stringify([]))
  }

  // store the local storage data in a state array
  const [reports, setReports] = useState(JSON.parse(localStorage.getItem("userReports")))

  // Remove a user report from state
  function removeReport(reportID) {
    setReports(reports.filter((report) => {
      return report.reportID !== reportID
    }))
  }

  // Add a user report to state
  function addReport(report) {
    let tempReportsArray = [...reports]
    tempReportsArray.push(report)
    setReports(tempReportsArray)
  }

  // Update the local storage on state change with current updated state
  useEffect(() => {
    localStorage.setItem("userReports", JSON.stringify(reports))
  }, [reports])

  // =============
  // Dummy Reports
  // =============
  // const reports = [
  //   {
  //     foodSource: "Hamburger",
  //     associatedDiseases: ["high cholesterol"],
  //     imgURL: "https://fastly.picsum.photos/id/425/200/300.jpg?hmac=P1vjZ6T-wo-aULK7NbbLYxIaV92_0q56o0BFWcWOdmo"
  //   },
  //   {
  //     foodSource: "Apple pie",
  //     associatedDiseases: ["diabetes", "coronary heart disease"],
  //     imgURL: "https://fastly.picsum.photos/id/824/200/300.jpg?hmac=CPaWVapi5aRxRDN0wSZfBeD_w8iiddSi1zhfyLj7AnA"
  //   },
  //   {
  //     foodSource: "Cheesecake",
  //     associatedDiseases: ["high cholesterol", "nephrotic syndrome", "arthritis"],
  //     imgURL: "https://fastly.picsum.photos/id/488/200/300.jpg?hmac=0juhK9GVPUpSjHaRjdjZO5Fw2bcfSYHNjXLYTg3ZsQU"
  //   },
  //   {
  //     foodSource: "Ice cream",
  //     associatedDiseases: ["migraine", "coronary heart disease", "cerebrovascular disease", "high cholesterol", "arthritis"],
  //     imgURL: "https://fastly.picsum.photos/id/75/200/300.jpg?hmac=sjSIzdmDj0dZefwBIN61pwl3azxymhEGh9owb8ZEgxg"
  //   }
  // ]

  // =============
  // Authorization
  // =============
  const [user, setUser] = useState({})

  // Google SSO auth function
  useEffect(() => {
    const theUser = localStorage.getItem("user");

    if (theUser && !theUser.includes("undefined")) {
      const parsedUser = JSON.parse(theUser)
      setUser(parsedUser);
    }
  }, [])

  // Unsubcribe auth function
  function signOut() {
    // Clear local storage
    localStorage.removeItem("user");
    localStorage.removeItem("userDiseases");
    localStorage.removeItem("userReports");

    // refresh react app
    window.location.reload();
  }

  // ====
  // HTML
  // ====
  // Routing done with react router
  return (
    // <BrowserRouter>
    <HashRouter basename="/">
      <Routes>
        {/* Defining Auth Routes */}
        <Route path='/' element={user?.email ? <Navigate to="/home" /> : <SignUpPage />} />
        <Route path='/signin' element={user?.email ? <Navigate to="/home" /> : <SignInPage />} />

        {/* Defining protected routes */}
        <Route element={<ProtectedRoutes user={user} />}>
          <Route path='/home' element={<HomePage userToken={user?.token} diseases={diseases} addReport={addReport} />} />
          <Route path='/diseases' element={<DiseasesPage user={user} diseases={diseases} addDisease={addDisease} removeDisease={removeDisease} />} />
          <Route path='/reports' element={<ReportsPage diseases={diseases} reports={reports} removeReport={removeReport} />} />
          <Route path='/recommendations' element={<Typography variant="h1" component="h1" textAlign="center">Under Construction...</Typography>} />
          <Route path='/options' element={<UserOptionsPage user={user} signOut={signOut} />} />
        </Route>

        {/* Defining Error Page */}
        <Route path='/*' element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
    // </BrowserRouter>
  )
}

// ===
// CSS
// ===
