import { Navigate, Outlet } from "react-router-dom"
import Footer from "../components/footer"
import Navbar from "../components/navbar"

export default function ProtectedRoutes({ user }) {
    const isAuth = user?.email ? true : false

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
