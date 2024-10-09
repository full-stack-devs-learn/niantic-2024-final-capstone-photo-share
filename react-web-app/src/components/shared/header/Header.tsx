import "./Header.css"

import { Link, NavLink } from "react-router-dom"
import { useAppDispatch } from "../../../store/hooks";
import { logout } from "../../../store/features/authentication-slice";
import { useSelector } from "react-redux";
import { RootState } from "../../../store/store";

export default function Header() {

    const dispatch = useAppDispatch()
    const { isAuthenticated, user } = useSelector((state: RootState) => state.authentication)

    function handleLogout()
    {
        localStorage.removeItem('user')
        dispatch(logout()) 
    }

    return (
        <nav className="navbar navbar-expand-lg bg-light" data-bs-theme="light">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">PhotoShare</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarColor02">
                    <ul className="navbar-nav me-auto header-left-section">
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/">Home</NavLink>
                        </li>
                        {/* Right now it's linking to userId instead of profileId */}
                        {
                        isAuthenticated && <>
                        <li className="nav-item"><NavLink className="nav-link" to={`/profile/${user?.id}`}>Profile</NavLink>
                        </li></>
                        }
                    </ul>
                    <ul className="navbar-nav ms-auto header-right-section" >
                        {!isAuthenticated 
                            ? 
                                <li className="nav-item">
                                    <NavLink className="nav-link" to="/login">Login</NavLink>
                                </li>
                            :   <>
                                    <li className="nav-item" id="right-child-1">
                                        <h5 className="nav-link">Hi, {user?.username}!</h5>
                                    </li>
                                    <li className="nav-item" id="right-child-2">
                                        <button className="nav-link" onClick={handleLogout} >Logout</button>
                                    </li>
                                </>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    )
}