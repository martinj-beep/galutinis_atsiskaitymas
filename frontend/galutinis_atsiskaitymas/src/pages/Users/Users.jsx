import axios from "axios"
import RegistrationFormContainer from "../../components/RegistrationFormContainer/RegistrationFormContainer";
import UsersContainer from "../../components/UsersContainer/UsersContainer";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"

const API_HOST = import.meta.env.VITE_API_HOST;

export default function Users() {
  const [users, setUsers] = useState([])

  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/login")
    } else {
      axios
        .get(API_HOST + "users", {
          headers: {
            Authorization: `bearer ${localStorage.getItem("token")}`
          }
        })
        .then((response) => setUsers(response.data))
        .catch((err) => {
          if (err.response.status === 403) {
            localStorage.removeItem("token")
            navigate("/login")
          } else {
            alert("kazkas negerai, pabandykite veliau")
          }
        })
    }

  }, []);

  console.log(users);

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
