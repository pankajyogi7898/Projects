import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import { useChat } from '../hooks/useChat'

const Dashboard = () => {
    const chat = useChat()

    const [chatInput, setChatInput] = useState('')
    const [userMessage, setUserMessage] = useState('')

    const chats = useSelector((state) => state.chat.chats)
    const currentChatId = useSelector((state) => state.chat.currentChatId)

    useEffect(() => {
        chat.initializeSocketConnection()
        chat.handlegetChats()
    }, [])

    const handleSubmitMessage = (event) => {
        event.preventDefault()

        const trimmedMessage = chatInput.trim()
        if (!trimmedMessage) {
            return
        }

        chat.handleSendMessage({ message: trimmedMessage, chatId: currentChatId })
        setChatInput('')
    }

    const openChat = (chatId) => {
        chat.handleOpenChat(chatId)
    }

    return (
        <main className='min-h-screen w-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-3 text-white md:p-5'>
            <section className='mx-auto flex flex-col md:flex-row h-[calc(100vh-1rem)] w-full max-w-[1440px] gap-3 rounded-[32px] border border-cyan-600/10 bg-slate-950/90 px-4 py-4 shadow-[0_45px_120px_-60px_rgba(14,165,233,0.65)] md:h-[calc(100vh-1.5rem)] md:gap-4 md:px-5 md:py-5'>
                <aside className='flex h-auto w-full flex-col rounded-[32px] border border-slate-700/70 bg-slate-900/85 p-3 md:h-full md:w-64 md:flex md:flex-col'>
                    <div className='mb-6 flex items-center justify-between gap-4'>
                        {/* <div>
                            <h1 className='text-3xl font-semibold text-white'>Yogi AI</h1>
                        </div> */}
                        <div className='inline-flex h-9 w-20 items-center justify-center rounded-3xl bg-cyan-300/15 text-orange-400 shadow-[0_8px_30px_-18px_rgba(56,189,248,0.9)]'>Yogi AI</div>
                    </div>

                    <div className='space-y-3 overflow-y-auto pr-1'>
                        {Object.values(chats).map((chat, index) => (
                            <button
                                onClick={() => { openChat(chat.id) }}
                                key={index}
                                type='button'
                                className='w-full cursor-pointer  rounded-[24px] border border-slate-700/70 bg-slate-950/80 px-4 py-3 text-left text-sm font-medium text-slate-100 transition hover:border-cyan-400/40 hover:bg-slate-900/90 hover:text-white'
                            >
                                {chat.title}
                            </button>
                        ))}
                    </div>
                </aside>

                <section className='relative flex h-full min-w-0 flex-1 flex-col gap-5 overflow-hidden rounded-[32px] bg-gradient-to-br from-slate-900/80 via-slate-950/75 to-slate-900/90 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]'>
                    <div className='messages flex-1 space-y-6 overflow-y-auto pr-2'>
                        {chats[currentChatId]?.messages.length > 0 ? (
                            chats[currentChatId].messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`max-w-[82%] w-fit rounded-[28px] px-5 py-4 text-sm leading-7 transition ${message.role === 'user'
                                        ? 'ml-auto rounded-br-[8px] bg-cyan-500/15 text-cyan-50 shadow-[0_24px_60px_-48px_rgba(34,211,238,0.7)]'
                                        : 'mr-auto rounded-bl-[8px] border border-white/10 bg-slate-900/85 text-slate-200'
                                        }`}
                                >
                                    {message.role === 'ai' ? (
                                        <div className='prose prose-invert overflow-x-auto text-sm leading-7 prose-p:my-0 prose-ul:pl-5 prose-li:marker:text-cyan-400'>
                                            <ReactMarkdown>
                                                {message.content}
                                            </ReactMarkdown>
                                        </div>

                                    ) : (
                                        <p className='whitespace-pre-line'>{message.content}</p>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className='flex h-full min-h-[60vh] flex-col items-center justify-center rounded-[28px] border border-dashed border-slate-700/70 bg-slate-900/70 px-6 py-10 text-center text-slate-400'>
                                <p className='mb-3 text-xl font-semibold text-slate-100'>Ready when you are</p>
                                <p className='max-w-md text-sm leading-6'>Type your first message below and the AI will respond instantly. The input area is designed to be large, comfy, and easy to use.</p>
                            </div>
                        )}
                    </div>

                    <footer className='rounded-[24px] border border-cyan-500/10 bg-slate-900/90 p-2.5 shadow-[0_10px_30px_-20px_rgba(14,165,233,0.55)]'>
                        <form onSubmit={handleSubmitMessage} className='flex flex-col gap-3 sm:flex-row'>
                            <input
                                type='text'
                                value={chatInput}
                                onChange={(event) => setChatInput(event.target.value)}
                                placeholder='Type your message...'
                                className='h-10 flex-1 rounded-[22px] border border-slate-700/80 bg-slate-950/95 px-3.5 text-sm text-slate-100 outline-none transition duration-200 focus:border-cyan-400/80 focus:ring-2 focus:ring-cyan-400/20 placeholder:text-slate-500'
                            />
                            <button
                                type='submit'
                                disabled={!chatInput.trim()}
                                className='inline-flex h-10 items-center justify-center rounded-[22px] bg-gradient-to-r from-cyan-400 to-sky-500 px-5 text-sm font-semibold text-slate-950 transition hover:from-cyan-300 hover:to-sky-400 disabled:cursor-not-allowed disabled:opacity-50'
                            >
                                Send
                            </button>
                        </form>
                    </footer>
                </section>
            </section>
        </main>
    )
}

export default Dashboard
