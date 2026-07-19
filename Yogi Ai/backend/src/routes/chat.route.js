import { Router } from "express";
import { deleteChat, getChats, getMessages, sendMessage } from "../controllers/chat.controller.js";
import { authUser } from "../middlewares/auth.midddleware.js";
const chatRouter = Router()

chatRouter.post('/message', authUser, sendMessage)
chatRouter.get('/', authUser, getChats)
chatRouter.get('/:chatId/messages', authUser, getMessages)
chatRouter.get('/delete/:chatId', authUser, deleteChat)



export default chatRouter