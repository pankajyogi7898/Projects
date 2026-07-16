import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cookieParser from 'cookie-parser';
import authRouter from './routes/auth.route.js';
import cors from "cors"
import morgan from "morgan"


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"))

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"]
}))


app.get('/', (req, res) => {
    res.status(200).json({ message: 'Welcome to Yogi AI' });
});

app.use("/api/auth", authRouter)


export default app;
