import joi from "joi";
import joiDate from "@joi/date";

const extendedJoi = joi.extend(joiDate);

const clientSchema = joi.object({
    fullName: extendedJoi.string().min(4).max(30).required(),
    email: extendedJoi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'lt'] } }).required(),
    dateOfBirth: extendedJoi.date().max("now").format('YYYY-MM-DD').required()
})

export async function validateClientBody(req, res, next) {
    const { error } = clientSchema.validate(req.body);

    if (error) {
        res.status(400).json({ message: error.message });
        return;
    }

    next()
}