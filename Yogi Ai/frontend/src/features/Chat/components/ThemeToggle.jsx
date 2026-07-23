import React, { useEffect, useState } from 'react'

const ThemeToggle = () => {
    const [isLight, setIsLight] = useState(() => {
        return localStorage.getItem('theme') === 'light'
    })

    useEffect(() => {
        const root = document.documentElement
        if (isLight) {
            root.classList.add('light')
            root.classList.remove('dark')
            localStorage.setItem('theme', 'light')
        } else {
            root.classList.add('dark')
            root.classList.remove('light')
            localStorage.setItem('theme', 'dark')
        }
    }, [isLight])

    return (
        <button
            type='button'
            onClick={() => setIsLight((prev) => !prev)}
            className='mb-2 flex w-full items-center gap-3 px-3 text-sm text-white/60 transition hover:text-white'
        >
            {isLight ? (
                <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'>
                    <path d='M21 12.8A9 9 0 1111.2 3 7 7 0 0021 12.8z' />
                </svg>
            ) : (
                <svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.6'>
                    <circle cx='12' cy='12' r='4' />
                    <path d='M12 2v2M12 20v2M4 12H2M22 12h-2M5 5l1.4 1.4M17.6 17.6L19 19M5 19l1.4-1.4M17.6 6.4L19 5' />
                </svg>
            )}
            {isLight ? 'Dark Mode' : 'Light Mode'}
        </button>
    )
}

export default ThemeToggle