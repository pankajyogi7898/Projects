import { createSlice } from '@reduxjs/toolkit';


const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        chats: {},
        currentChatId: null,
        isLoading: false,
        error: null,
        copiedIndex: null,
    },
    reducers: {
        createNewChat: (state, action) => {
            const { chatId, title } = action.payload
            state.chats[chatId] = {
                id: chatId,
                title,
                messages: [],
                lastUpdated: new Date().toISOString(),
            }
        },
        addNewMessage: (state, action) => {
            const { chatId, content, role } = action.payload
            state.chats[chatId].messages.push({ content, role })
        },
        addMessages: (state, action) => {
            const { chatId, messages } = action.payload
            state.chats[chatId].messages.push(...messages)
        },
        setChats: (state, action) => {
            state.chats = action.payload
        },
        removeChat: (state, action) => {
            const { chatId } = action.payload
            delete state.chats[chatId]
            if (state.currentChatId === chatId) {
                state.currentChatId = null
            }
        },
        setCurrentChatId: (state, action) => {
            state.currentChatId = action.payload
        },
        setLoading: (state, action) => {
            state.isLoading = action.payload
        },
        setError: (state, action) => {
            state.error = action.payload
        },
        addOptimisticMessage: (state, action) => {
            const { chatId, content, role } = action.payload;
            if (!state.chats[chatId]) return;
            state.chats[chatId].messages.push({
                content,
                role,
                optimistic: true
            });
        },
        addThinkingMessage: (state, action) => {
            const { chatId } = action.payload;
            if (!state.chats[chatId]) return;
            state.chats[chatId].messages.push({
                id: "thinking",
                role: "ai",
                content: "",
                thinking: true
            });
        },
        replaceThinkingMessage: (state, action) => {
            const { chatId, content } = action.payload;
            if (!state.chats[chatId]) return;
            const index = state.chats[chatId].messages.findIndex(
                msg => msg.thinking
            );
            if (index !== -1) {
                state.chats[chatId].messages[index] = {
                    role: "ai",
                    content
                };
            }
        },
        removeThinkingMessage: (state, action) => {
            const { chatId } = action.payload;
            if (!state.chats[chatId]) return;
            state.chats[chatId].messages =
                state.chats[chatId].messages.filter(
                    msg => !msg.thinking
                );
        },
        setCopiedIndex: (state, action) => {
            state.copiedIndex = action.payload
        },
        appendChunk: (state, action) => {
            const { chatId, chunk } = action.payload;
            if (!state.chats[chatId]) return;
            const msgs = state.chats[chatId].messages;
            const last = msgs[msgs.length - 1];
            if (last?.role === "ai" && last.thinking) {
                last.thinking = false;
                last.streaming = true;
                last.content = chunk;
            } else if (last?.role === "ai") {
                last.content += chunk;
            }
        },
        stopStreaming: (state, action) => {
            const { chatId } = action.payload;
            if (!state.chats[chatId]) return;
            const msgs = state.chats[chatId].messages;
            const last = msgs[msgs.length - 1];
            if (last?.role === "ai") {
                last.streaming = false;
            }
        },
    }
})

export const { setChats, removeChat, setCurrentChatId, setLoading, setError, createNewChat, addNewMessage, addMessages, addOptimisticMessage, addThinkingMessage, replaceThinkingMessage, removeThinkingMessage, setCopiedIndex, appendChunk, stopStreaming } = chatSlice.actions
export default chatSlice.reducer
