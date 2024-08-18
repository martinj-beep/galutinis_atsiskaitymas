import { useEffect, useState } from "react"
import axios from "axios"
import User from "../User/User";

const API_HOST = import.meta.env.VITE_API_HOST

export default function UsersContainer() {
    const [users, setUsers] = useState([]);

    function getUsers() {
        axios
        .get(API_HOST + "users")
        .then((response) => setUsers(response.data))
        .catch((err) => alert("Something went wrong"))
    }

    useEffect(() => {
        getUsers()
    }, []);

  return (
    <table>
        <thead>
            <tr>
            <th>Vardas</th>
            <th>Email</th>
            <th>Gimimo data</th>
            <th></th>
            <th></th>
            </tr>
        </thead>
        <tbody>
        {
            users.map((user) => (
                <User key={user._id} userData={user} refetchData={getUsers}/>
            ))
        }
        </tbody>
    </table>
  )
}
