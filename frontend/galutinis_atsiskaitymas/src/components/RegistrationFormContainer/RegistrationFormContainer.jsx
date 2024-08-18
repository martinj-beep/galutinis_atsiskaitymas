import { useState } from "react"
import "./RegistrationFormContainer.module.css"


export default function RegistrationFormContainer({ onSubmit, userData }) {
    const [fullName, setFullName] = useState(userData?.fullName)
    const [email, setEmail] = useState(userData?.email)
    const [dateOfBirth, setDateOfBirth] = useState(userData?.dateOfBirth)

    async function handleOnSubmit(e) {
        e.preventDefault();
        const body = {
            fullName,
            email,
            dateOfBirth
        };
        onSubmit(body);
    }


  return (
    <form onSubmit={handleOnSubmit}>
        <label htmlFor="fullName">Vardas pavarde: </label>
        <input type="text" id="fullName" minLength={4} maxLength={30} value={fullName} onChange={(e) => setFullName(e.target.value)}/> <br />
        <label htmlFor="email">Email: </label>
        <input type="text" id="email" value={email} onChange={(e) => setEmail(e.target.value)}/> <br />
        <label htmlFor="dateOfBirth">Gimimo data: </label>
        <input type="date" id="dateOfBirth" value={dateOfBirth} onChange={(e) => setDateOfBirth(e.target.value)}/> <br />
        <button type="submit">Pateikti</button>
    </form>
  )
}
