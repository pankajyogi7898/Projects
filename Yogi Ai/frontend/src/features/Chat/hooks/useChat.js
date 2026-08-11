import { initializeSocketConnection } from "../service/chat.socket"
import { sendMessage, getChats, getMessages, deleteChat } from "../service/chat.api";
import {
    setChats, removeChat, setCurrentChatId, setError, setLoading, createNewChat, addNewMessage, addMessages, addOptimisticMessage, addThinkingMessage,
    replaceThinkingMessage, removeThinkingMessage, setCopiedIndex, appendChunk, replaceChatId,stopStreaming,
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
        let tempChatId = null;
        try {

            if (!activeChatId) {

                tempChatId = `temp-${Date.now()}`;
                activeChatId = tempChatId;

                dispatch(createNewChat({
                    chatId: activeChatId,
                    title: "New Chat"
                }));

                dispatch(setCurrentChatId(activeChatId));

            }

            dispatch(addOptimisticMessage({
                chatId: activeChatId,
                content: message,
                role: "user"
            }));

            dispatch(addThinkingMessage({
                chatId: activeChatId
            }));

            const data = await sendMessage({
                message,
                chatId: chatId || null
            });
            const { chat } = data;

            if (tempChatId) {
                dispatch(replaceChatId({
                    oldChatId: tempChatId,
                    newChatId: chat._id,
                    title: chat.title
                }));
                activeChatId = chat._id;
            }
        } catch (err) {
            console.log(err);
            if (activeChatId) {
                dispatch(removeThinkingMessage({
                    chatId: activeChatId
                }));
            }
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

