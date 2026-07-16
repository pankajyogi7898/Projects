import { createBrowserRouter } from "react-router"
import Register from "../features/Auth/pages/Register"
import Login from "../features/Auth/pages/Login"
import Dashboard from "../features/Chat/pages/Dashboard"
import Protected from "../features/Auth/components/Protected"

const router = createBrowserRouter([
    {
        path: "/",
        element: <Protected>
            <Dashboard />
        </Protected>
    },
    {
        path: "/register",
        element: <Register />
    },
    {
        path: "/login",
        element: <Login />
    }
])

export default router