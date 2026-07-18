import dotenv from 'dotenv';
dotenv.config()
import app from './src/app.js';
import connectToDB from "./src/config/database.js"
import { initSocket } from './src/sockets/server.socket.js';
import http from "http"

const httpServer = http.createServer(app);

initSocket(httpServer);
connectToDB()



const PORT = process.env.PORT || 3000;

httpServer.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
