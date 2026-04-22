import React, { useState } from 'react';
import '../Sign_Up/Sign_Up.css';

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <section className="login-container">
            <div className="signup-box">
                <h1>Login</h1>
                <p>Are you a new member? <a href="/signup" className="login-link">Sign Up here.</a></p>

                <form>
                    {/* Email */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
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

                    {/* Buttons */}
                    <div className="button-group">
                        <button type="submit" className="btn-submit">Login</button>
                        <button type="reset" className="btn-reset">Reset</button>
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
