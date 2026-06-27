import { RouterProvider } from "react-router"
import { router } from "./auth.routes"
import { AuthProvider } from "./features/Auth/auth.context"

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  )
}

export default App
