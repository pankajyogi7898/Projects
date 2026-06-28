import { useState } from "react"
import { Link, useNavigate } from "react-router"
import "./style.scss"
import { useAuth } from "../hooks/useAuth"
const Login = () => {

    const { handleLogin } = useAuth()

    const Navigate = useNavigate()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleSubmit(e) {
        e.preventDefault()
        await handleLogin({ email, password })
        Navigate("/")
    }

    return (
        <main className="login-page">
            <div className="form-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value)
                            }}
                            type="email"
                            name="email"
                            placeholder="Enter your email"
                        />
                    </div>

                    <div className="input-group">
                        <label>Password</label>
                        <input
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value)
                            }}
                            type="password"
                            name="password"
                            placeholder="Enter your password"
                        />
                    </div>

                    <button type="submit">
                        Login
                    </button>

                    <p className="para">
                        Don't have an account? <Link to="/register">Register</Link>
                    </p>

                </form>
            </div>
        </main>
    )
}

export default Login
