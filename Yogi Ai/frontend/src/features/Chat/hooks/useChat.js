import { initializeSocketConnection } from "../service/chat.socket"
import { sendMessage, getChats, getMessages, deleteChat } from "../service/chat.api";
import {
    setChats, setCurrentChatId, setError, setLoading, createNewChat, addNewMessage, addMessages, addOptimisticMessage, addThinkingMessage,
    replaceThinkingMessage, removeThinkingMessage, setCopiedIndex , appendChunk } from "../chat.slice";
import { getSocket } from "../service/chat.socket";

import { useDispatch } from "react-redux";

export const useChat = () => {
    const dispatch = useDispatch()

    async function handleSendMessage({ message, chatId }) {
        dispatch(setLoading(true));
        let activeChatId = chatId;
        try {
            // Agar pehle se chat hai to user message turant dikhao
            if (activeChatId) {
                dispatch(addOptimisticMessage({
                    chatId: activeChatId,
                    content: message,
                    role: "user"
                }));
                dispatch(addThinkingMessage({
                    chatId: activeChatId
                }));
            }
            const data = await sendMessage({
                message,
                chatId: activeChatId
            });
            const { chat, aimessage } = data;
            // Agar naya chat tha
            if (!activeChatId) {
                dispatch(createNewChat({
                    chatId: chat._id,
                    title: chat.title
                }));
                dispatch(addNewMessage({
                    chatId: chat._id,
                    content: message,
                    role: "user"
                }));
                activeChatId = chat._id;
            }
            dispatch(replaceThinkingMessage({
                chatId: activeChatId,
                content: aimessage.content
            }));
            dispatch(setCurrentChatId(activeChatId));
        } catch (err) {
            if (activeChatId) {
                dispatch(removeThinkingMessage({
                    chatId: activeChatId
                }));
            }
            console.log(err);
        } finally {
            dispatch(setLoading(false));
        }

    }

    async function handlegetChats() {
        dispatch(setLoading(true))
        const data = await getChats()
        const { chats } = data
        dispatch(setChats(chats.reduce((acc, chat) => {
            acc[chat._id] = {
                id: chat._id,
                title: chat.title,
                messages: [],
                lastUpdated: chat.updateAt,
            }
            return acc
        }, {})))
        dispatch(setLoading(false))
    }

    async function handleOpenChat(chatId, chats) {
        if (chats[chatId]?.messages.length === 0) {
            const data = await getMessages(chatId)
            const { messages } = data

            const formattedMessages = messages.map(msg => ({
                content: msg.content,
                role: msg.role
            }))
            dispatch(addMessages({
                chatId,
                messages: formattedMessages
            }))
        }
        dispatch(setCurrentChatId(chatId))
    }
    function initializeStreamListener(currentChatId) {
        const socket = getSocket();
        socket.off("ai-stream");
        socket.on("ai-stream", ({ chunk }) => {
            dispatch(appendChunk({
                chatId: currentChatId,
                chunk,
            }));
        });
    }

    const handleCopyMessage = (content, index) => {
        navigator.clipboard.writeText(content)
        dispatch(setCopiedIndex(index))
        setTimeout(() => dispatch(setCopiedIndex(null)), 1500)
    }

    const handleCreateNewChat = () => {
        dispatch(setCurrentChatId(null))
    }

    return {
        initializeSocketConnection,
        handleSendMessage,
        initializeStreamListener,
        handlegetChats,
        handleOpenChat,
        handleCopyMessage,
        handleCreateNewChat
    }
}

