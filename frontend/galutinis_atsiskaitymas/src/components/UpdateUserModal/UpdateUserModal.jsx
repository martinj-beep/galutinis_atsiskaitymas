import reactDom from "react-dom"; 
import RegistrationFormContainer from "../RegistrationFormContainer/RegistrationFormContainer";
import axios from "axios";

const API_HOST = import.meta.env.VITE_API_HOST;

export default function UpdateUserModal({ userData, refetchData, onClose }) {

  async function updateUser(body) {
    try {
      await axios.put(API_HOST + `users/${userData._id}`, body)
      refetchData()
      onClose()
    } catch (error) {
      alert(error.message)
    }
  }

  return reactDom.createPortal(
    <div>
        <RegistrationFormContainer onSubmit={updateUser} userData={userData}/>
    </div>,
    document.body,
  );
}
