import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
import ClientRegistrationForm from "../models/ClientRegistrationForm.js";
import dotenv from "dotenv";

dotenv.config();

// admin

export async function registerNewUser(req, res) {
    const { username, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt)

    const newUser = new User ({
        username,
        password: hashedPassword
    })

    await newUser.save();

    res.json(newUser)
}

export async function loginUser(req, res) {
    const { username, password } = req.body;

    const user = await User.findOne({ username })

    if (!user) {
        return res.status(404).json({ err: "user not found" })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)

    if (isPasswordCorrect) {
        const secretKey = process.env.SECRET_KEY;

        const token = jwt.sign({ id: user._id, username: user.username }, secretKey, { expiresIn: "1h" })

        res.json({ token })
    } else {
        res.status(400).json({ message: "password incorrect" })
    }
    

}

// user

export async function getUsers(req, res) {

    try {
        const users = await ClientRegistrationForm.find({}, { ___v: 0});
    
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" }) 
    }
}

export async function createUser(req, res) {
    const { fullName, email, dateOfBirth } = req.body;

    try {
        const newUser = new ClientRegistrationForm({
            fullName,
            email,
            dateOfBirth,
        });

        await newUser.save();

        res.json(newUser)
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" })
    }
}

export async function updateUser(req, res) {
    const { id } = req.params;
    const { fullName, email, dateOfBirth } = req.body;

    try {
        const user = await ClientRegistrationForm.findById(id)

        if (!user) {
            res.status(404).json({ message: "User does not exist" })
            return
        }

        user.fullName = fullName;
        user.email = email;
        user.dateOfBirth = dateOfBirth;

        await user.save();

        res.json(user)
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" })
    }
}

export async function deleteUser(req, res) {
    const { id } = req.params;

    try {
        const deletedUser = await ClientRegistrationForm.findByIdAndDelete(id);

        if (!deletedUser) {
            res.status(404).json({ message: "Reservation does not exist" });
            return;
        }

        res.json(deletedUser)
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" })
    }
}