import React, { useState } from 'react';
import './Sign_up.css';

const Sign_up = () => {
    // State für die Passwort-Sichtbarkeit
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
    
        // Name Validierung (nur für Sign_up)
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
    

    return (
        <section className="signup-container">
            <div className="signup-box">
                <h1>Sign Up</h1>
                <p>Already a member? <a href="#" className="login-link">Login</a></p>

                <form onSubmit={handleSubmit} onReset={handleReset}>
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
                                type="te
                            xt" id="na
                            me" placeholder="Enter your na
                            me" requi
                        red />
                    </div>

                    {/* Phone */}
                    <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="Enter 10-digit phone number"
                            value={formData.phone}
                            onChange={handlePhoneChange} // Spezial-Funktion für die 10-Ziffern-Regel
                            required
                        />
                        {errors.phone && <span className="error-text" style={{color: 'red'}}>{errors.phone}</span>}
                    </div>

                    {/* Email */}
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            id="email" 
                            placeholder="Enter your email" 
                            required 
                            value={formData.email}
                            onChange={(e) => setFormData({...formData, email: e.target.value})}
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
                        <button type="submit" className="btn-submit">Submit</button>
                        <button type="reset" className="btn-reset">Reset</button>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Sign_up;
