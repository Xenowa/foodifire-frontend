import { Navigate, Outlet } from "react-router-dom"
import Footer from "../components/footer"
import Navbar from "../components/navbar"


function useAuth(userToken) {
    const user = { loggedIn: userToken === "nkbh2x4s" ? true : false }
    // const user = { loggedIn: true }
    return user && user.loggedIn
}

export default function ProtectedRoutes({ userToken }) {
    const isAuth = useAuth(userToken)

    return (
        isAuth ?
            // Protected routes are put through outlet
            (
                <div>
                    <Navbar />
                    <Outlet />
                    <Footer />
                </div>
            ) :

            // Redirect if not authorized
            <Navigate to="/" />
    )
}
