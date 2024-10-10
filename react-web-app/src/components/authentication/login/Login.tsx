import "./Login.css"

import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { LoginCredentials } from "../../../models/security/user-credentials"
import authenticationService from "../../../services/authentication-service"
import { login } from "../../../store/features/authentication-slice"
import { useAppDispatch } from "../../../store/hooks"

export default function Login()
{
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    const [username, setUserName] = useState<string>()
    const [password, setPassword] = useState<string>()

    async function loginHandler(event: React.FormEvent<HTMLFormElement>)
    {
        event.preventDefault()

        const credentials = new LoginCredentials()
        credentials.username = username!
        credentials.password = password!

        const authUser = await authenticationService.login(credentials);

        dispatch(login(authUser))
        navigate('/')
    }

    return (
        <div className="container mt-5 login-card">
            <h1 className="mb-4">Login</h1>
            <form onSubmit={loginHandler} method="post">
                <label className="form-label" htmlFor="username">Username:</label>
                    <input type="text" className="form-control" name="username" id="username"
                        onChange={(e) => setUserName(e.target.value)}
                    />

                    <label className="form-label mt-3" htmlFor="password">Password:</label>
                    <input type="password" className="form-control" name="password" id="password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                <button className="btn btn-success mr-3 mt-4" type="submit">Login</button>
            </form>
            <Link to="/register" className="btn btn-light mt-4" id="new-user">Register as new user</Link>
        </div>
    )
}