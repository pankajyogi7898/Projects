import { Link, useNavigate } from "react-router"
import "./style.scss"
import { useState } from "react"
import { useAuth } from "../hooks/useAuth"


const Register = () => {


    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const { loading, handleRegister } = useAuth()
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        await handleRegister({ username, email, password })
        navigate("/login")

    }
    return (
        <main className="register-page">
            <div className="form-container">
                <h1>Register</h1>
                <form onSubmit={handleSubmit} >
                    <div className="input-group">
                        <label>Username</label>
                        <input
                            value={username}
                            onChange={(e) => {
                                setUsername(e.target.value)
                            }}
                            type="text"
                            name="username"
                            placeholder="Enter your username"
                        />

                    </div>
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
                        Register
                    </button>

                    <p className="para">
                        You have an already account. <Link to="/login">Login</Link>
                    </p>

                </form>
            </div>
        </main>
    )
}

export default Register
