import React, { useState } from 'react';
import './Sign_Up.css';

import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config';

const Sign_Up = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const [formData, setFormData] = useState({
        role: '',
        name: '',
        phone: '',
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({});

    const validate = () => {
        let newErrors = {};
    
        // E-Mail Validierung (Regex)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            newErrors.email = "Email is required";
        } else if (!emailRegex.test(formData.email)) {
            newErrors.email = "Invalid email format";
        }
    
        // Passwort Validierung
        if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters long";
        }
    
        // Name Validierung (nur für Sign_Up)
        if (!formData.name) {
            newErrors.name = "Name is required";
        }
    
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; // true, wenn keine Fehler
    };
    
    const handleSubmit = (e) => {
        e.preventDefault(); // Verhindert Neuladen der Seite
        if (validate()) {
            console.log("Form data is valid:", formData);
            // Hier folgt der API-Aufruf zum Backend
        } else {
            console.log("Validation failed");
        }
    };

    
    /*******************/
    // Function to handle form submission
    const register = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // API Call to register user
        const response = await fetch(`${API_URL}/api/auth/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: name,
                email: email,
                password: password,
                phone: phone,
            }),
        });

        const json = await response.json(); // Parse the response JSON

        if (json.authtoken) {
            // Store user data in session storage
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);

            // Redirect user to home page
            navigate("/");
            window.location.reload(); // Refresh the page
        } else {
            if (json.errors) {
                for (const error of json.errors) {
                    setShowerr(error.msg); // Show error messages
                }
            } else {
                setShowerr(json.error);
            }
        }
    };

    /*******************/


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
                        <input 
                            type="text" 
                            id="name" 
                            placeholder="Enter your name" 
                            required 
                        />
                    </div> 
                    
                    {/* Phone */}
                    <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="Enter your phone number"
                            required
                        />
                    </div>

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

export default Sign_Up;
