import { Router } from "express";
import { userRegister, verifyEmail, resendEmail, userLogin, getMe } from "../controllers/auth.controller.js";
import { registerValidationRules, loginValidationRules, validateRegister } from "../middlewares/validateRegister.js";
import { authUser } from "../middlewares/auth.midddleware.js";

const authRouter = Router()

authRouter.post('/register', registerValidationRules, validateRegister, userRegister);
authRouter.post('/login', loginValidationRules, validateRegister, userLogin);

authRouter.get('/get-me', authUser, getMe);

authRouter.get('/verify-email', verifyEmail);
authRouter.post('/resend-email', resendEmail)

export default authRouter