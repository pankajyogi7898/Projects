import { useDispatch } from 'react-redux'
import { register, login, getMe } from '../service/auth.api'
import { setUser, setLoading, setError } from '../auth.slice.js'

export const useAuth = () => {
    const dispatch = useDispatch()

    async function handleRegister(username, email, password) {
        try {
            dispatch(setLoading(true))
            const response = await register(username, email, password)
        } catch (err) {
            dispatch(setError(err.response?.data?.message || 'registration failed!'))
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleLogin({ email, password }) {
        try {
            dispatch(setLoading(true))
            const response = await login(email, password)
            dispatch(setUser(response.data.user))

        } catch (err) {
            dispatch(setError(err.response?.data?.message || 'login failed!'))
        } finally {
            dispatch(setLoading(false))
        }
    }

    async function handleGetMe() {
        try {
            dispatch(setLoading(true))
            const response = await getMe()
            dispatch(setUser(response.data.user))
        } catch (err) {
            dispatch(setError(err.response?.data?.message || 'failed to fetch user!'))
        } finally {
            dispatch(setLoading(false))
        }
    }

    return {
        handleRegister,
        handleLogin,
        handleGetMe
    }
}

export default useAuth
