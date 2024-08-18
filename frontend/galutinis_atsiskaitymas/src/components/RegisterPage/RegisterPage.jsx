import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom";

const API_URL = import.meta.env.VITE_API_HOST

export default function RegisterPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [registerSuccessful, setRegisterSuccessful] = useState(false);

    const navigate = useNavigate();

    async function handleRegister(e) {
        e.preventDefault();

        const body = {
            username,
            password
        };

        try {
            await axios.post(API_URL + "register", body);
            setRegisterSuccessful(true);

            setTimeout(() => navigate("/login"), 2000);
        } catch (error) {
            alert(error.message);
        }

    }

  return (
    <div>
        <form onSubmit={handleRegister}>
            <input value={username} onChange={(e) => setUsername(e.target.value)} type="text" placeholder="Username"/> <br />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password"/> <br />
            <button type="submit">Uzsiregistruoti</button>
        </form>
        {registerSuccessful && <p>Uzsiregistravote sekmingai!</p>}
    </div>
  )
}
