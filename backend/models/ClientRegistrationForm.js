import mongoose from "mongoose";

const clientRegistrationFormSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    dateOfBirth: {
        type: Date,
        require: true
    }
});

export default mongoose.model("clientRegistrationForm", clientRegistrationFormSchema);