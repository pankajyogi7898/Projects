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
    }
})

export const { setChats, setCurrentChatId, setLoading, setError, createNewChat, addNewMessage, addMessages, addOptimisticMessage, addThinkingMessage, replaceThinkingMessage, removeThinkingMessage, setCopiedIndex } = chatSlice.actions
export default chatSlice.reducer
