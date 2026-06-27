const userModel = require("../models/user.model")
const blacklistModel = require("../models/blacklist.model")
const jwt = require("jsonwebtoken")
const redis = require("../config/cache")
const bcrypt = require("bcryptjs")

async function registerController(req, res) {
    const { username, email, password } = req.body

    console.log(req.body);
    console.log(password);

    const existingUser = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    });

    if (existingUser) {
        return res.status(400).json({
            message: "Username or Email already exists"
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        username,
        email,
        password: hashedPassword
    });

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );
    res.cookie("token", token)

    return res.status(201).json({
        message: "User registered successfully",
        user
    });
}

async function loginController(req, res) {
    const { username, password, email } = req.body

    const user = await userModel.findOne({
        $or: [
            { username },
            { email }
        ]
    }).select("+password")

    if (!user) {
        return res.status(401).json({
            message: "Invalid credential"
        });
    }

    const isMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (!isMatch) {
        return res.status(401).json({
            message: "Invalid Password"
        });
    }

    const token = jwt.sign(
        {
            id: user._id
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d"
        }
    );

    res.cookie("token", token)

    return res.status(200).json({
        message: "Login successfull..",
        user
    });
}

async function getMe(req, res) {
    const user = await userModel.findById(req.user.id)

    return res.status(200).json({
        message: "user fetched successfully...", user
    })
}
async function logoutUser(req, res) {

    const token = req.cookies.token
    res.clearCookie("token")

    await redis.set(token, Date.now().toString(), "EX", 60 * 60)


    res.status(200).json({
        message: "user logout sucessfully"

    })
}

module.exports = { registerController, loginController, getMe, logoutUser }