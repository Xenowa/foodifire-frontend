import './App.css'
import HomePage from './pages/homePage'
import DiseasesPage from './pages/diseasesPage'
import ReportsPage from './pages/reportsPage'
import SignInPage from './pages/signInPage'
import SignUpPage from './pages/signUpPage'
import { BrowserRouter, HashRouter, Navigate, Route, Routes } from "react-router-dom"
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
  // Create local storage array
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

  // =============
  // Dummy Reports
  // =============
  const reports = [
    {
      foodSource: "Hamburger",
      associatedDiseases: ["high cholesterol"],
      imgURL: "https://fastly.picsum.photos/id/425/200/300.jpg?hmac=P1vjZ6T-wo-aULK7NbbLYxIaV92_0q56o0BFWcWOdmo"
    },
    {
      foodSource: "Apple pie",
      associatedDiseases: ["diabetes", "coronary heart disease"],
      imgURL: "https://fastly.picsum.photos/id/824/200/300.jpg?hmac=CPaWVapi5aRxRDN0wSZfBeD_w8iiddSi1zhfyLj7AnA"
    },
    {
      foodSource: "Cheesecake",
      associatedDiseases: ["high cholesterol", "nephrotic syndrome", "arthritis"],
      imgURL: "https://fastly.picsum.photos/id/488/200/300.jpg?hmac=0juhK9GVPUpSjHaRjdjZO5Fw2bcfSYHNjXLYTg3ZsQU"
    },
    {
      foodSource: "Ice cream",
      associatedDiseases: ["migraine", "coronary heart disease", "cerebrovascular disease", "high cholesterol", "arthritis"],
      imgURL: "https://fastly.picsum.photos/id/75/200/300.jpg?hmac=sjSIzdmDj0dZefwBIN61pwl3azxymhEGh9owb8ZEgxg"
    }
  ]

  // =============
  // Authorization
  // =============
  // Create localstorage userToken Instance
  if (!localStorage.getItem("userToken")) {
    localStorage.setItem("userToken", "")
    localStorage.setItem("userName", "")
  }

  // get token from local storage to a state
  const [userToken, setUserToken] = useState(localStorage.getItem("userToken"))
  const [userName, setUserName] = useState(localStorage.getItem("userName"))

  // Google SSO auth function
  function authorize() {
    localStorage.setItem("userToken", "nkbh2x4s")
    localStorage.setItem("userName", "Jhon Doe")
    setUserToken(localStorage.getItem("userToken"))
    setUserName(localStorage.getItem("userName"))
  }

  // Unsubcribe auth function
  function signOut() {
    localStorage.removeItem("userToken")
    localStorage.removeItem("userName")
    setUserToken("")
    setUserName("")
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
        <Route path='/' element={userToken ? <Navigate to="/home" /> : <SignUpPage authorize={authorize} />} />
        <Route path='/signin' element={userToken ? <Navigate to="/home" /> : <SignInPage authorize={authorize} />} />
        <Route path='/options' element={<UserOptionsPage userName={userName} signOut={signOut} />} />

        {/* Defining protected routes */}
        <Route element={<ProtectedRoutes userToken={userToken} />}>
          <Route path='/home' element={<HomePage diseases={diseases} />} />
          <Route path='/diseases' element={<DiseasesPage diseases={diseases} addDisease={addDisease} removeDisease={removeDisease} />} />
          <Route path='/reports' element={<ReportsPage diseases={diseases} reports={reports} />} />
          <Route path='/recommendations' element={<Typography variant="h1" component="h1" textAlign="center">Under Construction...</Typography>} />
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
