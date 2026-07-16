import { useState } from 'react'
import { Link, useNavigate } from 'react-router'

const Register = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/login')
    }

    return (
        <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,_rgba(244,114,182,0.22),_transparent_28%),linear-gradient(135deg,_#1f2937_0%,_#111827_45%,_#312e81_100%)] px-4 py-8 sm:px-6 lg:px-8">
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -left-12 top-16 h-40 w-40 rounded-full bg-fuchsia-400/20 blur-3xl" />
                <div className="absolute bottom-6 right-4 h-56 w-56 rounded-full bg-violet-400/20 blur-3xl" />
            </div>

            <div className="relative flex min-h-[calc(100vh-4rem)] items-center justify-center">
                <div className="w-full max-w-md rounded-[28px] border border-fuchsia-400/20 bg-slate-950/80 p-8 text-white shadow-[0_20px_60px_rgba(2,6,23,0.45)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1">

                    <h2 className="text-center text-3xl font-semibold text-white">Create account</h2>
                    <p className="mt-2 text-center text-sm text-slate-300">Join us and get started today</p>

                    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username" className="mb-2 block text-sm font-medium text-slate-300">
                                Username
                            </label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-white shadow-sm outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-fuchsia-400 focus:bg-slate-900 focus:shadow-[0_0_0_4px_rgba(244,114,182,0.18)]"
                                required
                            />
                        </div>

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
                                className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-white shadow-sm outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-fuchsia-400 focus:bg-slate-900 focus:shadow-[0_0_0_4px_rgba(244,114,182,0.18)]"
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
                                placeholder="Create a password"
                                className="w-full rounded-xl border border-slate-700 bg-slate-900/80 px-4 py-3 text-white shadow-sm outline-none transition-all duration-300 placeholder:text-slate-400 focus:border-fuchsia-400 focus:bg-slate-900 focus:shadow-[0_0_0_4px_rgba(244,114,182,0.18)]"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full rounded-xl bg-gradient-to-r from-fuchsia-500 via-violet-500 to-indigo-600 px-4 py-3 font-medium text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl"
                        >
                            Register
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-slate-400">
                        Already have an account?{' '}
                        <Link to="/login" className="font-semibold text-fuchsia-300 transition hover:text-fuchsia-200 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Register
