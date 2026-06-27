const express = require("express")
const AuthController = require("../controllers/auth.controller")
const AuthMiddleware = require("../middleware/auth.middleware")

const router = express.Router()

router.post("/register", AuthController.registerController)
router.post("/login", AuthController.loginController)
router.get("/getMe", AuthMiddleware.authMiddleware, AuthController.getMe)
router.get("/logout", AuthController.logoutUser)




module.exports = router