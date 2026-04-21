import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="nav_bar">
      <div className="company_logo">
        StayHealthy <i className="fa fa-heartbeat" aria-hidden="true"></i>
      </div>
      
      <div className="nav_links">
        <a href="#home">Home</a>
        <a href="#appointments">Appointments</a>
        <a href="#blog">Health Blog</a>
        <a href="#reviews">Reviews</a>

        <div className="nav_login">
          <a href="#signup" className="btn-signup">Sign Up</a>
          <a href="#login" className="btn-login">Login</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
