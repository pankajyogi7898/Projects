import { useState, useEffect } from 'react';
import ThemeToggle from "./ThemeToggle.jsx"

export function Sidebar({ chat, chatList, currentChatId, openChat, user }) {
    const [isCollapsed, setIsCollapsed] = useState(false);

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
                e.preventDefault();
                setIsCollapsed(prev => !prev);
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    return (
        <aside className={`flex h-screen flex-col border-r border-white/5 bg-black transition-all duration-300 hidden md:flex ${isCollapsed ? 'w-16 px-2 py-3' : 'w-60 px-3 py-2'}`}>

            {/* Header */}
            <div className='mb-2 flex items-center justify-between gap-2 px-1'>
                {!isCollapsed && (
                    <div className='flex items-center gap-2'>
                        <img src="/logo.png" alt="Yogi AI" className="yogi-logo-dark h-8 w-auto object-contain" />
                        <img src="/logowhite.png" alt="Yogi AI" className="yogi-logo-light h-8 w-auto object-contain" />
                        <h1 className='text-xl font-semibold text-white'>Yogi AI</h1>
                    </div>
                )}

                {isCollapsed && (
                    <div className='flex h-8 w-8 items-center justify-center'>
                        <div className='h-6 w-6 rounded-full' >
                            <img src="/yogiai.png" alt="" className="yogi-logo-dark" />
                            <img src="/logowhite.png" alt="" className="yogi-logo-light"/>
                        </div>
                    </div>
                )}

                <button
                    type='button'
                    onClick={() => setIsCollapsed(prev => !prev)}
                    title={isCollapsed ? 'Expand (Ctrl+B)' : 'Collapse (Ctrl+B)'}
                    className='flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-md text-white/60 transition hover:bg-white/10 hover:text-white'
                >
                    <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
                        {isCollapsed
                            ? <path d='M9 6l6 6-6 6' />
                            : <path d='M15 6l-6 6 6 6' />
                        }
                    </svg>
                </button>
            </div>

            {/* Navigation */}
            <nav className='space-y-1 text-sm text-white/70'>
                <button
                    type='button'
                    title='Insta Post'
                    className='flex w-full items-center gap-3 rounded-lg px-3 py-2 transition hover:bg-white/5 hover:text-white'
                >
                    <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' className='flex-shrink-0'>
                        <rect x='3' y='3' width='18' height='18' rx='4' />
                        <circle cx='12' cy='12' r='4' />
                    </svg>
                    {!isCollapsed && <span>Insta Post</span>}
                </button>

                <button
                    type='button'
                    onClick={() => chat.handleCreateNewChat()}
                    title='New Chat'
                    className='flex w-full items-center gap-3 rounded-lg px-3 py-2 transition hover:bg-white/5 hover:text-white'
                >
                    <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6' className='flex-shrink-0'>
                        <path d='M12 5v14M5 12h14' />
                    </svg>
                    {!isCollapsed && <span>New Chat</span>}
                </button>
            </nav>

            {/* Recent Chats - only when expanded */}
            {!isCollapsed && (
                <div className='mt-4 flex-1 overflow-y-auto pr-1'>
                    <p className='mb-2 px-3 text-[11px] font-semibold uppercase tracking-wide text-white/40'>Recent</p>
                    <div className='space-y-1'>
                        {chatList.slice(0, 6).map((c, index) => (
                            <div
                                key={index}
                                className={`flex items-center justify-between rounded-lg px-3 py-1 text-sm transition hover:bg-white/5 ${c.id === currentChatId ? 'bg-white/5 text-white' : 'text-white/60'}`}
                            >
                                <button
                                    type='button'
                                    onClick={() => openChat(c.id)}
                                    className='flex-1 truncate text-left hover:text-white'
                                    title={c.title}
                                >
                                    {c.title}
                                </button>
                                <button
                                    type='button'
                                    onClick={(e) => { e.stopPropagation(); chat.handleDeleteChat(c.id); }}
                                    className='ml-2 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full text-red-400 transition hover:bg-white/10 hover:text-red-300'
                                    aria-label={`Delete ${c.title}`}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M3 6h18" /><path d="M8 6V4h8v2" />
                                        <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                        <path d="M10 11v6" /><path d="M14 11v6" />
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
            )}

            {/* Spacer when collapsed */}
            {isCollapsed && <div className='flex-1' />}

            {/* Footer */}
            <div className={`mt-auto border-t border-white/10 pt-2 flex flex-col gap-1 ${isCollapsed ? 'items-center' : ''}`}>

                {/* Theme Toggle - pass isCollapsed so it adapts */}
                <ThemeToggle isCollapsed={isCollapsed} />

                {/* User */}
                <div className={`flex items-center gap-2 rounded-lg py-2 transition hover:bg-white/5 ${isCollapsed ? 'justify-center px-1' : 'px-2'}`}>
                    <div className='flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-teal-500 text-xs font-semibold text-white'>
                        {(user?.username || 'U').slice(0, 1).toUpperCase()}
                    </div>
                    {!isCollapsed && (
                        <span className='text-sm font-medium text-white/80'>{user?.username || 'account'}</span>
                    )}
                </div>

            </div>
        </aside>
    );
}