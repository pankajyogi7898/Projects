import { useState } from 'react'
// import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router'
import useAuth from '../hook/useAuth'

const Login = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { handleLogin } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const payload = {
            email, password
        }
        await handleLogin(payload)
        navigate('/')

    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.22),_transparent_28%),linear-gradient(135deg,_#020617_0%,_#0f172a_45%,_#111827_100%)] px-4 py-8 sm:px-6 lg:px-8">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -left-12 top-8 h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl" />
                <div className="absolute bottom-4 right-4 h-56 w-56 rounded-full bg-emerald-400/20 blur-3xl" />
            </div>

            <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center">
                <div className="w-full max-w-md rounded-[28px] border border-cyan-400/20 bg-slate-950/80 p-8 text-white shadow-[0_20px_60px_rgba(2,6,23,0.45)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1">

                    <h2 className="text-center text-3xl font-semibold text-white">Welcome back</h2>
                    <p className="mt-2 text-center text-sm text-slate-300">Sign in to continue to your account</p>

                    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">
                                Email
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter your email"
                                className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-white shadow-sm outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-cyan-400 focus:bg-slate-900 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.18)]"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-300">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-white shadow-sm outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-cyan-400 focus:bg-slate-900 focus:shadow-[0_0_0_4px_rgba(34,211,238,0.18)]"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-xl bg-gradient-to-r from-cyan-500 via-sky-500 to-emerald-500 px-4 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                        >
                            Login
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-400">
                        Don&apos;t have an account?{' '}
                        <Link to="/register" className="font-semibold text-cyan-300 transition hover:text-cyan-200 hover:underline">
                            Register
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Login
