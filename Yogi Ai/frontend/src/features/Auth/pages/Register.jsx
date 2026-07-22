import { useState } from 'react'
import { Link, useNavigate } from 'react-router'
import { register as apiRegister, resendEmail as apiResendEmail, login as apiLogin } from '../service/auth.api'

const Register = () => {
    const navigate = useNavigate()
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [showPassword, setShowPassword] = useState(false)
    const [registered, setRegistered] = useState(false)
    const [isChecking, setIsChecking] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault()
        setIsSubmitting(true)
        apiRegister(username, email, password)
            .then((res) => {
                const data = res?.data || {}
                showToast(data.message || 'Account created — please verify your email', 'success')
                // keep user on the Register page until they verify
                setRegistered(true)
            })
            .catch((err) => {
                const message = err?.response?.data?.message || err?.message || 'Registration failed'
                showToast(message, 'error')
            })
            .finally(() => setIsSubmitting(false))
    }

    const [isResending, setIsResending] = useState(false)
    const [resendMessage, setResendMessage] = useState('')
    const [toast, setToast] = useState({ visible: false, message: '', type: 'info' })

    const showToast = (message, type = 'info', timeout = 3500) => {
        setToast({ visible: true, message, type })
        setTimeout(() => setToast((t) => ({ ...t, visible: false })), timeout)
    }

    const handleResend = (e) => {
        if (!email) {
            setResendMessage('Enter your email above to resend')
            showToast('Please enter your email first', 'error')
            return
        }

        setIsResending(true)
        setResendMessage('')
        apiResendEmail(email)
            .then((res) => {
                const data = res?.data || {}
                setResendMessage(data.message || 'Verification email sent')
                showToast(data.message || 'Verification email sent', 'success')
            })
            .catch((err) => {
                const message = err?.response?.data?.message || 'Could not resend email. Please try again.'
                setResendMessage(message)
                showToast(message, 'error')
            })
            .finally(() => setIsResending(false))
    }

    // Called when user clicks "I've verified" — we attempt to log in using entered credentials.
    const handleCheckVerification = (e) => {
        if (!email || !password) {
            showToast('Please enter the same email & password you used to register', 'error')
            return
        }

        setIsChecking(true)
        apiLogin(email, password)
            .then((res) => {
                showToast('User email verified', 'success')
                // after successful verification, navigate to login page
                setTimeout(() => navigate('/login'), 900)
            })
            .catch((err) => {
                const message = err?.response?.data?.message || 'Email not verified yet'
                showToast(message, 'error')
            })
            .finally(() => setIsChecking(false))
    }

    return (
        <div className="min-h-screen bg-[#070707] px-4 py-6 sm:px-6 lg:px-8">
            <div className="relative flex min-h-[calc(100vh-3rem)] items-center justify-center">
                <div className="w-full max-w-sm sm:max-w-md rounded-2xl border border-cyan-400/12 bg-[#0b0f12]/90 p-6 sm:p-8 text-white shadow-[0_20px_60px_rgba(2,6,23,0.45)] backdrop-blur-xl transition-all duration-300">

                    <h2 className="text-center text-3xl sm:text-4xl font-extrabold text-white leading-tight">Create account</h2>
                    <p className="mt-2 text-center text-sm sm:text-base text-slate-400">Join us and get started today</p>

                    <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username" className="mb-2 block text-sm font-medium text-slate-300">Username</label>
                            <input
                                id="username"
                                name="username"
                                type="text"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder="Enter your username"
                                className="w-full h-12 sm:h-14 rounded-2xl border border-slate-700/60 bg-transparent px-4 text-slate-100 placeholder:text-slate-500 outline-none transition duration-200 focus:border-cyan-400/80 focus:ring-2 focus:ring-cyan-400/10"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-300">Email</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="you@example.com"
                                className="w-full h-12 sm:h-14 rounded-2xl border border-slate-700/60 bg-transparent px-4 text-slate-100 placeholder:text-slate-500 outline-none transition duration-200 focus:border-cyan-400/80 focus:ring-2 focus:ring-cyan-400/10"
                                required
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-300">Password</label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Create a password"
                                    className="w-full h-12 sm:h-14 rounded-2xl border border-slate-700/60 bg-transparent px-4 pr-12 text-slate-100 placeholder:text-slate-500 outline-none transition duration-200 focus:border-cyan-400/80 focus:ring-2 focus:ring-cyan-400/10"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword((s) => !s)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300 hover:text-slate-100"
                                >
                                    {showPassword ? '🙈' : '👁️'}
                                </button>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`mx-auto w-full rounded-2xl bg-cyan-400 px-6 py-3 sm:py-4 text-base sm:text-lg font-semibold text-slate-900 shadow-[0_20px_40px_-10px_rgba(6,182,212,0.45)] transition ${isSubmitting ? 'opacity-60 cursor-not-allowed' : 'hover:brightness-95'}`}
                        >
                            {isSubmitting ? 'Creating...' : 'Create account'}
                        </button>
                    </form>

                    {registered && (
                        <div className="mt-6 rounded-lg border border-slate-700/40 bg-slate-900/20 p-4 text-sm text-slate-200">
                            <p className="mb-3">We've sent a verification email to <span className="font-medium">{email}</span>. Please click the link in that email to verify your account.</p>
                            <div className="flex items-center gap-3">
                                <button onClick={handleCheckVerification} disabled={isChecking} className={`rounded-lg bg-emerald-500 px-4 py-2 font-semibold text-slate-900 ${isChecking ? 'opacity-60 cursor-not-allowed' : 'hover:brightness-95'}`}>
                                    {isChecking ? 'Checking...' : "I've verified"}
                                </button>
                                <button onClick={handleResend} disabled={isResending} className={`ml-auto rounded-lg bg-transparent px-3 py-2 font-medium text-cyan-300 ${isResending ? 'opacity-60 cursor-not-allowed' : 'hover:text-cyan-200'}`}>
                                    {isResending ? 'Resending...' : 'Resend email'}
                                </button>
                            </div>
                            {resendMessage && <p className="mt-3 text-sm text-slate-400">{resendMessage}</p>}
                        </div>
                    )}

                    <p className="mt-6 text-center text-sm text-slate-400">Already have an account?{' '}
                        <Link to="/login" className="font-semibold text-cyan-300 transition hover:text-cyan-200 hover:underline">Login</Link>
                    </p>

                    <div className="mt-6 border-t border-slate-700/40 pt-4">
                        <div className="flex items-center gap-3 text-sm text-slate-300">
                            <svg className="h-5 w-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8.5v7A2.5 2.5 0 005.5 18h13A2.5 2.5 0 0021 15.5v-7A2.5 2.5 0 0018.5 6h-13A2.5 2.5 0 003 8.5z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8.5l8 5 8-5"></path></svg>
                            <span>Didn't get the email?</span>
                            <button
                                type="button"
                                onClick={handleResend}
                                disabled={isResending}
                                className="ml-auto text-cyan-300 font-medium hover:text-cyan-200"
                            >
                                {isResending ? 'Resending...' : 'Resend'}
                            </button>
                        </div>

                    </div>
                </div>
            </div>
            {toast.visible && (
                <div className="fixed right-6 bottom-6 z-50 max-w-xs">
                    <div className={`flex items-center gap-4 rounded-xl px-4 py-3 shadow-lg ${toast.type === 'error' ? 'bg-rose-900 border border-rose-600 text-rose-100' : toast.type === 'success' ? 'bg-slate-900/90 border border-emerald-600 text-emerald-200' : 'bg-slate-800/90 text-slate-100'}`}>
                        <div className="flex-none">
                            {toast.type === 'error' ? (
                                <svg className="h-5 w-5 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v4m0 4h.01M21 12A9 9 0 113 12a9 9 0 0118 0z" /></svg>
                            ) : (
                                <svg className="h-5 w-5 text-emerald-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4" /></svg>
                            )}
                        </div>
                        <div className="flex-1 text-sm">{toast.message}</div>
                        <button onClick={() => setToast((t) => ({ ...t, visible: false }))} className="ml-2 text-slate-300 hover:text-white">✕</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Register
