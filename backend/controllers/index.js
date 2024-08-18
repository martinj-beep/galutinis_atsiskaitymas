import ClientRegistrationForm from "../models/ClientRegistrationForm.js";

export async function getUsers(req, res) {

    try {
        const users = await ClientRegistrationForm.find({}, { ___v: 0});
    
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong" }) // cia gali buti kad reikes atskiro modelio registracijos formai, ir kito modelio esamiems registruotiems
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