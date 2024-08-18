import { Route, Routes } from "react-router-dom"
import Users from "./pages/Users/Users"
import RegisterPage from "./components/RegisterPage/RegisterPage"
import LoginPage from "./components/LoginPage/LoginPage"

function App() {

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/register" element={<RegisterPage />}/>
      <Route path="/users" element={<Users />}/>
    </Routes>
  )
}

export default App
