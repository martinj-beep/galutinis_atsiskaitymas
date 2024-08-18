import axios from "axios";
import UpdateUserModal from "../UpdateUserModal/UpdateUserModal";
import { useState } from "react";
import "./User.Modal.css"

const API_HOST = import.meta.env.VITE_API_HOST;

export default function User({ userData, refetchData }) {

  const [showUpdateModal, setShowUpdateModal] = useState(false)

  async function handleDelete() {
    const shouldDelete = confirm(`Ar tikrai norite istrinti vartotoja ${userData.fullName}?`)

    if (shouldDelete) {
      try {
        await axios.delete(API_HOST + `users/${userData._id}`)
        refetchData();
      } catch (error) {
        alert(error.message)
      }
    }
  }

  return (
    <>
    <tr>
      <td>{userData.fullName}</td>
      <td>{userData.email}</td>
      <td>{userData.dateOfBirth}</td>
      <td><button onClick={handleDelete}>Istrinti vartotoja</button></td>
      <td><button onClick={() => setShowUpdateModal(true)}>Atnaujinti vartotoja</button></td>
    </tr>
    {showUpdateModal && <UpdateUserModal refetchData={refetchData} userData={userData} onClose={() => setShowUpdateModal(false)} />}
    </>
  )
}

