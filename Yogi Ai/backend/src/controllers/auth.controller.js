import jwt from 'jsonwebtoken';
import { userModel } from '../models/user.model.js';
import { sendEmail } from "../services/mail.service.js";
import cookieParser from 'cookie-parser';

export async function userRegister(req, res) {
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
        lastVerificationEmailSentAt: new Date()
    });

    const emailVerifyToken = jwt.sign({
        email: user.email
    }, process.env.JWT_SECRET)

    await sendEmail({
        to: email,
        subject: "Welcome to Yogi AI  ",
        html:
            `
                <h1>Welcome, ${user.username}!
                </h1><p>Thank you for registering with us.</p>
                <p>We're excited to have you on board and look forward to providing you with the best experience possible.</p>
                <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
                <p>To verify your email address, please click the link below :</p>
                <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerifyToken}">Verify Email</a>
                <p>Best regards,</p>
                <p>The Yogi AI Team</p>`,
    })

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

export async function userLogin(req, res) {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })
    if (!user) {
        return res.status(400).json({
            message: "invalid user",
            success: false,
            err: "user is not found!"
        })
    }
    const isPassMatched = await user.comparePassword(password);

    console.log("isPassMatched:", isPassMatched);
    if (!isPassMatched) {
        return res.status(400).json({
            message: "invalid email and password",
            success: false,
            err: "user not found"
        })
    }
    if (!user.verified) {
        return res.status(400).json({
            message: "please verify your email before loggedIn",
            success: false,
            err: "email not valid"
        })
    }
    const token = jwt.sign({
        id: user._id,
        username: user.username,
        email: user.email
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message: "user LoggedIn successfully...",
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}

export async function getMe(req, res) {

    const userId = req.user.id

    const user = await userModel.findById(userId).select("-password")

    if (!user) {
        return res.status(401).json({
            message: "user not found"
        })
    }
    res.status(200).json({
        message: "user fetched successfully",
        success: true,
        user
    })

}

export async function verifyEmail(req, res) {
    const { token } = req.query;

    const decoded = jwt.verify(token, process.env.JWT_SECRET)

    if (!token) {
        return res.status(400).json({
            message: "token is missing",
            success: false,
            err: "user not verified"
        })
    }

    const user = await userModel.findOne({ email: decoded.email })


    if (!user) {
        return res.status(404).json({
            success: false,
            message: "User not found"
        });
    }

    if (user.verified) {
        return res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Already Verified</title>
    </head>
    <body style="font-family:Arial;text-align:center;padding-top:100px;">
        <h1>✅ Email Already Verified</h1>
        <p>Your account is already verified.</p>
        <p>Please login from the application.</p>
        <a href="http://localhost:3000/api/auth/login">Click here to login</a>
    </body>
    </html>
    `);
    }

    user.verified = true;

    await user.save();

    const html = `
    <h1> Email Verified Successfully..</h1>
    <p>Thank you for verifying your email address. </p>
    <a href="http://localhost:3000/api/auth/login">Click here to login</a>`

    res.send(html);

    res.status(200).json({
        message: "Email Verify successfully"
    })

}

export async function resendEmail(req, res) {

    const { email } = req.body

    const user = await userModel.findOne({ email: email })

    if (!user) {
        return res.status(404).json({
            message: "user not found",
            success: false,
            err: "invalid credential"
        })
    }

    if (user.verified) {
        return res.json({
            message: "Email already verified"
        })
    }
    const now = Date.now();
    const lastSent = new Date(user.lastVerificationEmailSentAt).getTime();

    if (now - lastSent < 10 * 1000) {
        return res.status(429).json({
            success: false,
            message: "Please wait 10 seconds before requesting another email."
        });
    }

    const emailVerifyToken = jwt.sign({
        email: user.email
    }, process.env.JWT_SECRET)


    await sendEmail({
        to: email,
        subject: "Welcome to Yogi AI  ",
        html:
            `
                <h1>Welcome, ${user.username}!
                </h1><p>Thank you for registering with us.</p>
                <p>We're excited to have you on board and look forward to providing you with the best experience possible.</p>
                <p>If you have any questions or need assistance, feel free to reach out to our support team.</p>
                <p>To verify your email address, please click the link below :</p>
                <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerifyToken}">Verify Email</a>
                <p>Best regards,</p>
                <p>The Yogi AI Team</p>`,
    })

    user.lastVerificationEmailSentAt = new Date();

    await user.save();

    res.status(200).json({
        message: "Verification email sent successfully.",
        success: true,
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })


}
