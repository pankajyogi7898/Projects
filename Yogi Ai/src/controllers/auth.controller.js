import jwt from 'jsonwebtoken';
import { userModel } from '../models/user.model.js';
import { sendEmail } from "../services/mail.service.js";

export async function userRegister(req, res) {
    console.log("EMAIL:", process.env.EMAIL_USER);
    console.log("APP_PASSWORD:", process.env.APP_PASSWORD);
    const { username, email, password } = req.body;

    const userAlreadyExist = await userModel.findOne({
        $or: [{ username }, { email }],
    });

    if (userAlreadyExist) {
        return res.status(400).json({
            message: 'User is already registered with this username or email',
            success: false,
            error: 'User already exists',
        });
    }

    const user = await userModel.create({
        username,
        password,
        email,
    });

    try {
        await sendEmail({
            to: email,
            subject: "Welcome to Yogi AI  ",
            html:
                `
                <h1>Welcome, ${user.username}!
                </h1><p>Thank you for registering with us.</p>
                <p>We're excited to have you on board and look forward to providing you with the best experience possible.</p>
                <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
                <p>Best regards,</p>
                <p>The Yogi AI Team</p>`,
        })
    }
    catch (err) {
        console.error("Error sending email:", err);
    }

    res.status(201).json({
        message: "user registered successfully....",
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })

}
