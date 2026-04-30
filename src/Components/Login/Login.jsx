import React, { useState, useEffect } from 'react';
import '../Sign_Up/Sign_Up.css';
import { useNavigate, Link } from 'react-router-dom';
import { API_URL } from '../../../config';

const Login = () => {
    // States für die Formularfelder
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState('');
    
    const navigate = useNavigate();

    // Falls der User bereits eingeloggt ist, zur Startseite umleiten
    useEffect(() => {
        if (sessionStorage.getItem("auth-token")) {
            navigate("/");
        }
    }, [navigate]);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        // API-Aufruf zur Authentifizierung
        const res = await fetch(`${API_URL}/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: email,
                password: password,
            }),
        });

        const json = await res.json();

        if (json.authtoken) {
            // Speichern der Daten im SessionStorage
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("email", email);
            navigate("/");
            window.location.reload();
        } else {
            if (json.errors) {
                setError(json.errors.map(err => err.msg).join(', '));
            } else {
                setError(json.error || "Login fehlgeschlagen");
            }
        }
    };

    return (
        <section className="login-container">
            <div className="signup-box">
                <h1>Login</h1>
                <p>Are you a new member? <Link to="/signup" className="login-link">Sign Up here.</Link></p>

                <form onSubmit={handleLogin}>
                    {/* Email */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email" 
                            required 
                        />
                    </div>

                    {/* Passwort */}
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-wrapper">
                            <input 
                                type={showPassword ? "text" : "password"} 
                                id="password" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter password" 
                                required 
                            />
                            <i 
                                className={`fa ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`} 
                                id="togglePassword" 
                                onClick={togglePasswordVisibility}
                                style={{ cursor: 'pointer' }}
                            ></i>
                        </div>
                    </div>

                    {error && <div className="err-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

                    {/* Buttons */}
                    <div className="button-group">
                        <button type="submit" className="btn-submit">Login</button>
                        <button type="reset" className="btn-reset" onClick={() => {setEmail(''); setPassword(''); setError('');}}>Reset</button>
                    </div>

                    <div className="forgot-password">
                        <p><a href="#" className="login-link">Forgot Password?</a></p>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Login;
