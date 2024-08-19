import express from "express";
import { createUser, deleteUser, getUsers, loginUser, registerNewUser, updateUser } from "../controllers/index.js";
import { validateClientBody } from "../middleware/clientRegistrationFormValidation.js";
import { validateIdParam } from "../middleware/validateIdParam.js";
import { validateJwt } from "../middleware/validateJwtMiddleware.js";

const router = express.Router();

router.post("/register", registerNewUser);

router.post("/login", loginUser);



router.post("/users",  validateClientBody, createUser);

router.get("/users",  getUsers);

router.put("/users/:id",  validateIdParam, validateClientBody, updateUser);

router.delete("/users/:id",  validateIdParam, deleteUser);

export default router;
