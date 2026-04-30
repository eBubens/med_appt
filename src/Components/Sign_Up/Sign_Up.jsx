// Following code has been commented with appropriate comments for your reference.
import React, { useState } from 'react';
import './Sign_Up.css'
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../../../config';

// Function component for Sign Up form
const Sign_Up = () => {
    // State variables using useState hook
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');

    const [showerr, setShowerr] = useState(''); // State to show error messages
    const navigate = useNavigate(); // Navigation hook from react-router

    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Function to handle form submission
    const register = async (e) => {
        e.preventDefault(); // Prevent default form submission

        // API Call to register user
        const response = await fetch(`${API_URL}api/auth/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: name,
            email: email,
            password: password,
            phone: phone,
            role: role, // 2. Rolle wird jetzt mitgeschickt!
        }),
    });

        const json = await response.json(); // Parse the response JSON

        if (json.authtoken) {
            sessionStorage.setItem("auth-token", json.authtoken);
            sessionStorage.setItem("name", name);
            sessionStorage.setItem("phone", phone);
            sessionStorage.setItem("email", email);
            sessionStorage.setItem("role", role);
            navigate("/");
            window.location.reload();
        } else {
            // 3. Fehler-Handling reparieren (verhindert Error #31)
            if (json.errors && Array.isArray(json.errors)) {
                // Wir nehmen die Nachricht des ersten Fehlers als Text
                setShowerr(json.errors[0].msg || "Validierungsfehler");
            } else if (json.error) {
                setShowerr(typeof json.error === 'string' ? json.error : "Ein Fehler ist aufgetreten");
            }
        }
    };

    // JSX to render the Sign Up form
    return (
        <section className="signup-container">
            <div className="signup-box">
                <h1>Sign Up</h1>
                <p>Already a member? <Link to="/login" className="login-link">Login</Link></p>

                <form method="POST" onSubmit={register}>
                    {/* Rolle */}
                    <div className="form-group">
                        <label htmlFor="role">Role</label>
                        <select 
                            id="role" 
                            name="role" 
                            required 
                            value={role} 
                            onChange={(e) => setRole(e.target.value)} // 4. OnChange hinzufügen!
                        >
                            <option value="" disabled>Select a role</option>
                            <option value="doctor">Doctor</option>
                            <option value="patient">Patient</option>
                        </select>
                    </div>

                    {/* Name */}
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input 
                            value={name}
                            onChange={(e) => setName(e.target.value)}
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
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
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
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            type="email" 
                            name="email" 
                            id="email" 
                            className="form-control" 
                            placeholder="Enter your email" 
                            required
                        />
                        {/* Error message displayed here if exists */}
                        {showerr && <div className="err" style={{ color: 'red', fontSize: '12px', marginTop: '5px' }}>{showerr}</div>}
                    </div>
                    
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <div className="password-wrapper">
                            <input 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
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
                        <button type="submit" className="btn-submit">Sign Up</button>
                        <button type="reset" className="btn-reset" onClick={() => {setName(''); setEmail(''); setPhone(''); setPassword(''); setShowerr('');}}>Reset</button>
                    </div>

                    <div className="forgot-password">
                        <p><a href="#" className="login-link">Forgot Password?</a></p>
                    </div>

                </form>
            </div>
        </section>
    );
}

export default Sign_Up;
