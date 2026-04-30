import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState("");
    const navigate = useNavigate();

    // Prüfen, ob der Nutzer eingeloggt ist
    useEffect(() => {
        const token = sessionStorage.getItem("auth-token");
        const name = sessionStorage.getItem("name");
        
        if (token) {
            setIsLoggedIn(true);
            // Extrahiere Name aus Email, falls kein Name gespeichert wurde
            setUserName(name || sessionStorage.getItem("email")?.split('@')[0] || "User");
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.clear(); // Alle Daten (Token, Name, Email) löschen
        setIsLoggedIn(false);
        navigate("/");
        window.location.reload(); // Seite neu laden, um State überall zurückzusetzen
    };

    return (
        <nav className="nav_bar">
            <div className="company_logo">
                <Link style={{textDecoration:'none', color: 'inherit'}} to="/">
                    StayHealthy <i className="fa fa-heartbeat" aria-hidden="true"></i>
                </Link>
            </div>
            
            <div className="nav_links">
                <Link to="/">Home</Link>
                <Link to="/instant-consultation">Instant Consultation</Link>
                <Link to="/appointments">Appointments</Link>
                <Link to="/blog">Health Blog</Link>
                <Link to="/reviews">Reviews</Link>

                <div className="nav_login">
                    {isLoggedIn ? (
                        <>
                            <span className="welcome-user">Welcome, {userName}</span>
                            <button onClick={handleLogout} className="btn-logout">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/signup" className="btn-signup">Registration</Link>
                            <Link to="/login" className="btn-login">Login</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
