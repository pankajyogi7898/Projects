import { RouterProvider } from "react-router"
import { router } from "./auth.routes"
import { AuthProvider } from "./features/Auth/auth.context"
import { SongContextProvider } from "./features/home/song.context"

function App() {
  return (
    <AuthProvider>
      <SongContextProvider>
        <RouterProvider router={router}></RouterProvider>
      </SongContextProvider>
    </AuthProvider>
  )
}

export default App
