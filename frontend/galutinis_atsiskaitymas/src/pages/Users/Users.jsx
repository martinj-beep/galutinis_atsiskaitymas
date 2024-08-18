import axios from "axios"
import RegistrationFormContainer from "../../components/RegistrationFormContainer/RegistrationFormContainer";
import UsersContainer from "../../components/UsersContainer/UsersContainer";
import { useEffect } from "react";

const API_HOST = import.meta.env.VITE_API_HOST;

export default function Users() {

  useEffect(() => {
    axios.get
  }, [])

  async function handleSubmit(body) {
    await axios.post(API_HOST + "users", body)
  }

  return (
    <div>
      <RegistrationFormContainer onSubmit={handleSubmit}/>
      <UsersContainer />
    </div>
  )
}
