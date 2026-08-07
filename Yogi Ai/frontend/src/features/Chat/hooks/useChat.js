import { initializeSocketConnection } from "../service/chat.socket"
import { sendMessage, getChats, getMessages, deleteChat } from "../service/chat.api";
import {
    setChats, removeChat, setCurrentChatId, setError, setLoading, createNewChat, addNewMessage, addMessages, addOptimisticMessage, addThinkingMessage,
    replaceThinkingMessage, removeThinkingMessage, setCopiedIndex, appendChunk, stopStreaming,
} from "../chat.slice";
import { getSocket } from "../service/chat.socket";

import { useDispatch } from "react-redux";

let typingQueue = [];
let isTyping = false;

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
                console.log("before thinking message dispatch")
                dispatch(addThinkingMessage({
                    chatId: activeChatId
                }));
                console.log("after thinking message dispatch")
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
        if (!socket) return;

        socket.off("ai-stream");
        socket.off("ai-end");

        socket.on("ai-stream", ({ chunk }) => {
            dispatch(
                appendChunk({
                    chatId: currentChatId,
                    chunk,
                })
            );
        });

        socket.on("ai-end", () => {
            dispatch(stopStreaming({
                chatId: currentChatId,
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

    async function handleDeleteChat(chatId) {
        try {
            await deleteChat(chatId)
            dispatch(removeChat({ chatId }))
        } catch (err) {
            console.log(err)
            dispatch(setError("Failed to delete chat"))
        }
    }

    // function processQueue(currentChatId, dispatch) {
    //     if (isTyping) return;
    //     isTyping = true;
    //     const typing = setInterval(() => {
    //         if (typingQueue.length === 0) {
    //             clearInterval(typing);
    //             isTyping = false;
    //             return;
    //         }
    //         const letter = typingQueue.shift();
    //         dispatch(
    //             appendChunk({
    //                 chatId: currentChatId,
    //                 chunk: letter
    //             })
    //         );
    //     }, 12);
    // }

    return {
        initializeSocketConnection,
        handleSendMessage,
        initializeStreamListener,
        handlegetChats,
        handleOpenChat,
        handleCopyMessage,
        handleCreateNewChat,
        handleDeleteChat
    }
}

