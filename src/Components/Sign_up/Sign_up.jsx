import React, { useState } from 'react';
import './Sign_up.css';

const Sign_up = () => {
    // State für die Passwort-Sichtbarkeit
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <section className="signup-container">
            <div className="signup-box">
                <h1>Sign Up</h1>
                <p>Already a member? <a href="#" className="login-link">Login</a></p>

                <form>
                    {/* Rolle */}
                    <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <select id="role" name="role" required defaultValue="">
                            <option value="" disabled>Select a role</option>
                            <option value="doctor">Doctor</option>
                            <option value="patient">Patient</option>
                            <option value="admin">Administrator</option>
                        </select>
                    </div>

                    {/* Name */}
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" placeholder="Enter your name" required />
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="Enter your email" required />
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
                        <button type="submit" className="btn-submit">Submit</button>
                        <button type="reset" className="btn-reset">Reset</button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Sign_up;
