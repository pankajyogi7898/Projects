import { login, register, getMe, logoutUser } from "../services/auth.api";
import { AuthContext } from "../auth.context"
import { useContext, useEffect } from "react";

export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    async function handleRegister({ username, email, password }) {
        setLoading(true)
        const data = await register({ username, email, password })
        setUser(data.user)
        setLoading(false)
    }
    async function handleLogin({ username, email, password }) {
        setLoading(true)
        const data = await login({ username, email, password })
        setUser(data.user)
        setLoading(false)
    }
    async function handlegetMe() {
        setLoading(true)
        const data = await getMe()
        setUser(data.user)
        setLoading(false)
    }
    async function handlelogoutUser() {
        setLoading(true)
        const data = await logoutUser()
        setUser(data.user)
        setLoading(false)
    }

    useEffect(() => {
        handlegetMe()
    }, [])


    return ({
        user, loading, handleRegister, handleLogin, handlegetMe, handlelogoutUser
    })

}