import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.APP_PASSWORD,
    },
});

transporter.verify()
    .then(() => console.log("Transporter verified successfully"))
    .catch(err => console.log(err));

export async function sendEmail({ to, subject, html, text }) {
    const info = await transporter.sendMail({
        from: process.env.EMAIL_USER,
        to,
        subject,
        html,
        text,
    });

    console.log(info);
    return "email sent successfully" + to
}