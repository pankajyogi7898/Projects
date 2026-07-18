import React from 'react'
import { useSelector } from 'react-redux'
import { useChat } from '../hooks/useAuth'
import { useEffect } from 'react'

const Dashboard = () => {
    const chat = useChat()

    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        chat.initializeSocketConnection
    }, [])

    console.log(user)

    return (
        <>
            Dashboard
        </>
    )
}

export default Dashboard
