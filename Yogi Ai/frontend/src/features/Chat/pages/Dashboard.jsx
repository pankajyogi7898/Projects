import React, { useEffect, useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import ReactMarkdown from 'react-markdown'
import { useChat } from '../hooks/useChat'
import ThemeToggle from '../components/ThemeToggle'

const Dashboard = () => {
    const chat = useChat()
    const user = useSelector((state) => state.auth.user)
    const [chatInput, setChatInput] = useState('')

    const chats = useSelector((state) => state.chat.chats)
    const currentChatId = useSelector((state) => state.chat.currentChatId)
    const copiedIndex = useSelector((state) => state.chat.copiedIndex)
    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [
        chats[currentChatId]?.messages
    ]);

    useEffect(() => {
        chat.initializeSocketConnection()
        chat.handlegetChats()
    }, [])

    useEffect(() => {
        if (currentChatId) {
            chat.initializeStreamListener(currentChatId);
        }
    }, [currentChatId])

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
        chat.handleOpenChat(chatId, chats)
    }

    const hasMessages = chats[currentChatId]?.messages.length > 0
    const chatList = Object.values(chats)

    return (
        <main className='flex min-h-screen w-full bg-black text-white'>
            {/* Sidebar */}
            <aside className='hidden h-screen w-64 flex-col border-r border-white/10 bg-black px-3 py-4 md:flex'>
                <div className='mb-6 flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2.5 text-sm font-medium text-white'>
                    <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'>
                        <path d='M12 2l2.2 4.6L19 8l-3.6 3.2.9 5-4.3-2.5-4.3 2.5.9-5L5 8l4.8-1.4z' />
                    </svg>
                    Search
                </div>

                <nav className='space-y-1 text-sm text-white/70'>
                    <button type='button' className='flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition hover:bg-white/5 hover:text-white'>
                        <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'><circle cx='12' cy='12' r='9' /><path d='M12 7v5l3 2' /></svg>
                        Chats
                    </button>

                    <button type='button' className='flex w-full items-center gap-3 rounded-lg px-3 py-2.5 transition hover:bg-white/5 hover:text-white'>
                        <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'><rect x='3' y='3' width='18' height='18' rx='4' /><circle cx='12' cy='12' r='4' /></svg>
                        Insta Post
                    </button>
                </nav>

                <button
                    type='button'
                    onClick={() => chat.handleCreateNewChat()}
                    className='mt-3 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-white/70 transition hover:bg-white/5 hover:text-white'
                >
                    <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'><path d='M12 5v14M5 12h14' /></svg>
                    New Chat
                </button>

                <div className='mt-6 flex-1 overflow-y-auto pr-1'>
                    <p className='mb-2 px-3 text-[11px] font-semibold uppercase tracking-wide text-white/40'>Recent</p>
                    <div className='space-y-1'>
                        {chatList.slice(0, 6).map((c, index) => (
                            <div
                                key={index}
                                className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm transition hover:bg-white/5 ${c.id === currentChatId ? 'bg-white/5 text-white' : 'text-white/60'}`}
                            >
                                <button
                                    type='button'
                                    onClick={() => openChat(c.id)}
                                    className='flex-1 truncate text-left hover:text-white'
                                >
                                    {c.title}
                                </button>
                                <button
                                    type='button'
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        chat.handleDeleteChat(c.id)
                                    }}
                                    className='ml-2 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-red-400 transition hover:bg-white/10 hover:text-red-300'
                                    aria-label={`Delete ${c.title}`}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="18"
                                        height="18"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <path d="M3 6h18" />
                                        <path d="M8 6V4h8v2" />
                                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                        <path d="M10 11v6" />
                                        <path d="M14 11v6" />
                                    </svg>
                                </button>
                            </div>
                        ))}
                    </div>
                    {chatList.length > 6 && (
                        <button type='button' className='mt-2 px-3 text-xs font-medium text-cyan-400 hover:text-cyan-300'>
                            View All
                        </button>
                    )}
                </div>

                <div className='mt-4 border-t border-white/10 pt-4'>
                    <ThemeToggle />
                    <div className='flex items-center gap-2 px-3 py-1'>
                        <div className='flex h-8 w-8 items-center justify-center rounded-full bg-teal-500 text-md font-semibold'>
                            {(user?.username || 'U').slice(0, 1).toUpperCase()}
                        </div>
                        <span className='text-md font-medium text-white/80'>{user?.username || 'account'}</span>
                    </div>
                </div>
            </aside>

            {/* Main */}
            <section className='flex h-screen flex-1 flex-col'>
                {!hasMessages ? (
                    <div className='flex flex-1 flex-col items-center justify-center px-4'>
                        <div className='mb-10 flex items-center gap-3'>
                            <svg width='40' height='40' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.3'>
                                <path d='M12 2l2.2 4.6L19 8l-3.6 3.2.9 5-4.3-2.5-4.3 2.5.9-5L5 8l4.8-1.4z' />
                            </svg>
                            <h1 className='text-4xl font-light tracking-tight text-white/90'>Yogi AI</h1>
                        </div>

                        <div className='mb-4 flex flex-wrap items-center justify-center gap-2'>
                            {['Trending Tech', 'Startups', 'AI Tools', 'Gadgets'].map((label) => (
                                <button
                                    key={label}
                                    type='button'
                                    className='rounded-full border border-white/15 px-4 py-2 text-sm text-white/70 transition hover:border-white/30 hover:text-white'
                                >
                                    {label}
                                </button>
                            ))}
                        </div>

                        <form onSubmit={handleSubmitMessage} className='w-full max-w-2xl'>
                            <div className='rounded-3xl border border-white/10 bg-white/5 p-3'>
                                <input
                                    type='text'
                                    value={chatInput}
                                    onChange={(event) => setChatInput(event.target.value)}
                                    placeholder='Ask anything...'
                                    className='mb-3 w-full bg-transparent px-2 pt-1 text-base text-white outline-none placeholder:text-white/40'
                                />
                                <div className='flex items-center justify-between px-1'>
                                    <button type='button' className='flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:bg-white/10'>
                                        <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8'><path d='M12 5v14M5 12h14' /></svg>
                                    </button>
                                    <div className='flex items-center gap-2'>
                                        <button type='button' className='flex h-9 w-9 items-center justify-center rounded-full text-white/50 transition hover:bg-white/10 hover:text-white'>
                                            <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8'><rect x='9' y='2' width='6' height='12' rx='3' /><path d='M5 11a7 7 0 0014 0M12 18v3' /></svg>
                                        </button>
                                        <button
                                            type='submit'
                                            disabled={!chatInput.trim()}
                                            className='flex h-9 w-9 items-center justify-center rounded-full bg-orange-400 text-black transition disabled:cursor-not-allowed hover:cursor-pointer disabled:opacity-40'
                                        >
                                            <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><path d='M12 19V5M5 12l7-7 7 7' /></svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                ) : (
                    <>
                        <div className='messages flex-1 space-y-6 overflow-y-auto px-6 py-6'>
                            {chats[currentChatId].messages.map((message, index) => (
                                <div
                                    key={index}
                                    className={`max-w-[75%] w-fit rounded-2xl px-4 py-3 text-sm leading-7 ${message.role === 'user'
                                        ? 'ml-auto bg-white/10 text-white'
                                        : 'mr-auto text-white/90'
                                        }`}
                                >
                                    {message.role === 'ai' ? (
                                        message.thinking ? (
                                            <div className="flex items-center gap-2 py-2">
                                                <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400"></div>
                                                <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:150ms]"></div>
                                                <div className="h-2 w-2 animate-bounce rounded-full bg-cyan-400 [animation-delay:300ms]"></div>
                                                <span className="ml-2 text-sm text-gray-400">
                                                    Thinking...
                                                </span>

                                            </div>

                                        ) : (
                                            <>
                                                <div className='prose prose-invert text-sm leading-7 prose-p:my-0'>
                                                    <ReactMarkdown
                                                        components={{
                                                            p: ({ children }) => <p className="mb-2 last:mb-0 leading-7 text-white/90">{children}</p>,
                                                            h1: ({ children }) => <h1 className="mb-4 text-3xl font-bold">{children}</h1>,
                                                            h2: ({ children }) => <h2 className="mb-3 text-2xl font-semibold">{children}</h2>,
                                                            h3: ({ children }) => <h3 className="mb-2 text-xl font-semibold">{children}</h3>,
                                                            ul: ({ children }) => <ul className="mb-3 list-disc pl-6 space-y-1">{children}</ul>,
                                                            ol: ({ children }) => <ol className="mb-3 list-decimal pl-6 space-y-1">{children}</ol>,
                                                            li: ({ children }) => <li className="leading-7">{children}</li>,
                                                            strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
                                                            em: ({ children }) => <em className="italic">{children}</em>,
                                                            blockquote: ({ children }) => <blockquote className="my-3 border-l-4 border-cyan-500 pl-4 italic text-white/70">{children}</blockquote>,
                                                            a: ({ href, children }) => <a href={href} target="_blank" rel="noreferrer" className="text-cyan-400 underline">{children}</a>,
                                                            hr: () => <hr className="my-5 border-white/10" />,
                                                            code: ({ children }) => <code className="rounded px-1.5 py-0.5 font-mono text-sm">{children}</code>,
                                                            pre: ({ children }) => <pre className="my-3 overflow-x-auto rounded-xl bg-zinc-900 p-4">{children}</pre>,
                                                        }}
                                                    >{message.content}</ReactMarkdown>

                                                </div>
                                                <div className='mt-3 flex flex-row items-center gap-6 text-white'>
                                                    <button
                                                        type='button'
                                                        onClick={() => chat.handleCopyMessage(message.content, index)}
                                                        className='transition hover:text-white'
                                                    >
                                                        {copiedIndex === index ? (
                                                            <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                                                                <path d='M20 6L9 17l-5-5' />
                                                            </svg>
                                                        ) : (
                                                            <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'>
                                                                <rect x='9' y='9' width='11' height='11' rx='2' />
                                                                <path d='M5 15V5a2 2 0 012-2h10' />
                                                            </svg>
                                                        )}
                                                    </button>
                                                    <button
                                                        type='button'
                                                        onClick={() => chat.handleFeedback(index, 'up')}
                                                        className='transition hover:text-white'
                                                    >
                                                        <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'>
                                                            <path d='M7 10v11M14 21h4a2 2 0 002-2v-6a2 2 0 00-2-2h-4.5l1-4.5a1.5 1.5 0 00-2.6-1.3L9 10H3v11h4' />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        type='button'
                                                        onClick={() => chat.handleFeedback(index, 'down')}
                                                        className='transition hover:text-white'
                                                    >
                                                        <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' transform='rotate(180 2 2)'>
                                                            <path d='M7 10v11M14 21h4a2 2 0 002-2v-6a2 2 0 00-2-2h-4.5l1-4.5a1.5 1.5 0 00-2.6-1.3L9 10H3v11h4' />
                                                        </svg>
                                                    </button>
                                                </div>
                                            </>

                                        )
                                    ) : (
                                        <p className='whitespace-pre-line'>{message.content}</p>
                                    )}
                                </div>
                            ))}
                            <div ref={bottomRef}></div>
                        </div>

                        <div className='px-6 pb-6'>
                            <form onSubmit={handleSubmitMessage} className='mx-auto max-w-2xl rounded-3xl border border-white/10 bg-white/5 p-3'>
                                <input
                                    type='text'
                                    value={chatInput}
                                    onChange={(event) => setChatInput(event.target.value)}
                                    placeholder='Ask anything...'
                                    className='mb-3 w-full bg-transparent px-2 pt-1 text-base text-white outline-none placeholder:text-white/40'
                                />
                                <div className='flex items-center justify-between px-1'>
                                    <button type='button' className='flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:bg-white/10 hover:cursor-pointer'>
                                        <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8'><path d='M12 5v14M5 12h14' /></svg>
                                    </button>
                                    <button
                                        type='submit'
                                        disabled={!chatInput.trim()}
                                        className='flex h-9 w-9 items-center justify-center rounded-full bg-orange-600 text-black transition disabled:cursor-not-allowed hover:cursor-pointer disabled:opacity-40'
                                    >
                                        <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'><path d='M12 19V5M5 12l7-7 7 7' /></svg>
                                    </button>
                                </div>
                            </form>
                        </div>
                    </>
                )}
            </section>
        </main >
    )
}

export default Dashboard