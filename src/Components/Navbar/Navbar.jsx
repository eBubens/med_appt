import React from 'react';
import { Link } from 'react-router-dom'; // WICHTIG: Link importieren
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="nav_bar">
      <div className="company_logo">
        StayHealthy <i className="fa fa-heartbeat" aria-hidden="true"></i>
      </div>
      
      <div className="nav_links">
        <Link to="/">Home</Link>
        <Link to="/instant-consultation">Instant Consultation</Link>
        <Link to="/appointments">Appointments</Link>
        <Link to="/blog">Health Blog</Link>
        <Link to="/reviews">Reviews</Link>

        <div className="nav_login">
          {/* Hier die Pfade anpassen */}
          <Link to="/signup" className="btn-signup">Sign Up</Link>
          <Link to="/login" className="btn-login">Login</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

