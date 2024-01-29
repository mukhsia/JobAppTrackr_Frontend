import React from 'react';
import { useContext } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AuthContext from '../../context/AuthContext';
import './NavBar.css';

const Navbar = () => {
    const { logoutUser, user } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <div className="navBar">
            {user ? (
                <ul className="nav-links">
                    <li>
                        <Link
                            to="/MyDashboard"
                            style={{ textDecoration: 'none', color: 'white' }}
                        >
                            <b>Dashboard</b>
                        </Link>
                    </li>
                    <li>
                        <Link
                            to="/MyJobApplications"
                            style={{ textDecoration: 'none', color: 'white' }}
                        >
                            <b>My Job Applications</b>
                        </Link>
                    </li>
                </ul>
            ) : (
                <h1>Job App Tracker</h1>
            )}
            <div className="nav-user">
                {user ? (
                    <div>
                        <b className="logged-user">Hello, {user.userName}</b>
                        <button className="btn-logout" onClick={logoutUser}>
                            Logout
                        </button>
                    </div>
                ) : (
                    <button
                        className="btn-login"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;
