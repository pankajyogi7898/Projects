import { Router } from "express";
import { userRegister } from "../controllers/auth.controller.js";
import { registerValidationRules, validateRegister } from "../middlewares/validateRegister.js";


const authRouter = Router()

authRouter.post('/register', registerValidationRules, validateRegister, userRegister);

export default authRouter