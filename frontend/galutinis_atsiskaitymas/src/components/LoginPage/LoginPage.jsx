import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import style from "./LoginPage.module.css"

const API_URL = import.meta.env.VITE_API_HOST

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

     useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/users")
        }
     }, [navigate])

    async function handleLogin(e) {
        e.preventDefault();

        const body = {
            username,
            password
        };

        try {
            const response = await axios.post(API_URL + "login", body);
            localStorage.setItem("token", response.data.token)
            navigate("/users")
        } catch (error) {
            alert("Nepavyko prisijungti");
        }

    }

  return (
    <div>
        <form onSubmit={handleLogin}>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username"/> <br />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"/> <br />
            <button type="submit">Prisijungti</button>
        </form>
    </div>
  )
}
